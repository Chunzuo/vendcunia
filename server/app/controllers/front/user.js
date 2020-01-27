'use strict';

const nodemailer = require('nodemailer');
const TokenGenerator = require('uuid-token-generator');
const { OAuth2Client } = require('google-auth-library');
var hbs = require('nodemailer-express-handlebars');

var utils = require('../../../core/utils');
var settings = require('../../../config/settings');

var user = require('../../models/user');
var users_groups = require('../../models/users_groups');
var connection_register = require('../../models/connection_register');

var bcrypt = require('bcryptjs'),
    mysql = require('mysql')

var connection;

module.exports = {

    setConnection: function(con) {
        connection = con;
        user.setConnection(con);
        users_groups.setConnection(con);
        connection_register.setConnection(con);
    },

    register: function(req, res, next) {
        if (!req.body.email || typeof req.body.email === 'undefined' || req.body.email === null || req.body.email === '') {
            return res({ success: 0, msg: 'invalid parameters for email' });
        }

        if (!req.body.password || typeof req.body.password === 'undefined' || req.body.password === null || req.body.password === '') {
            return res({ success: 0, msg: 'invalid parameters for password' });
        }

        if (!req.body.first_name || typeof req.body.first_name === 'undefined' || req.body.first_name === null || req.body.first_name === '') {
            return res({ success: 0, msg: 'invalid parameters for first name' });
        }

        if (!req.body.last_name || typeof req.body.last_name === 'undefined' || req.body.last_name === null || req.body.last_name === '') {
            return res({ success: 0, msg: 'invalid parameters for last name' });
        }

        const tokgen = new TokenGenerator();

        user.getUserInfoByEmail(req.body.email, function(results) {
            if (results.success === -2) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);
                const register_token = tokgen.generate();

                const now = new Date(); 
                const nowSec = parseInt(now.getTime() / 1000, 10);

                const insertUserInfo = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: hash,
                    salt: salt,
                    active: 0,
                    activation_code: register_token.substr(0, 6),
                    created_on: nowSec,
                    activation_code: register_token,
                    avatar: settings.server_url + '/avatar/user.jpg'
                }

                user.addNewUser(insertUserInfo, function(results_1) {
                    if (results_1.success === 1) {
                        var createdUserId = results_1.newUserId;
                        users_groups.getInfoByUserId(createdUserId, function(results_2) {
                            if (results_2.success === -2) {
                                users_groups.addNewUserGroupInfo(createdUserId, 2, function(results_3) {
                                    if (results_3.success === 1) {
                                        return res.json({ success: 1, token: register_token });
                                    } else if (results_3.success === 0) {
                                        return res.json({ success: 0, msg: results_3.msg });
                                    } else if (results_3.success === -1) {
                                        return res.json({ success: -1, msg: results_3.msg });
                                    }
                                });
                            } else if (results_2.success === 1) {
                                return res.json({ success: 1, token: register_token });
                            } else if (results_2.success === 0) {
                                return res.json({ success: 0, msg: results_2.msg });
                            } else if (results_2.success === -1) {
                                return res.json({ success: -1, msg: results_2.msg });
                            }
                        });
                    } else if (results_1.success === 0) {
                        return res.json({ success: 0, msg: results_1.msg });
                    } else if (results_1.success === -1) {
                        return res.json({ success: -1, msg: results_1.msg });
                    }
                });
            } else if (results.success === 0) {
                return res({ success: 0, msg: 'invalid parameters for email' });
            } else if (results.success === -1) {
                return res.json({ success: -5, msg: 'database query error when getting user info!' });
            } else if (results.success === 1) {
                return res.json({ success: -2, msg: 'email_already_exists' })
            }
        });
    },

    login: function(req, res, next) {
        if (!req.body.email || typeof req.body.email === 'undefined' || req.body.email === null || req.body.email === '') {
            return res({ success: 0, msg: 'invalid parameters for email' });
        }

        user.getUserInfoByEmail(req.body.email, function(results) {
            if (results.success === 1) {
                const userInfo = results.user;
                if (userInfo.active == 0) {
                    return res.json({ success: -3, msg: 'you_are_inactive_user' });
                } else if (!bcrypt.compareSync(req.body.password, userInfo.password)) {
                    return res.json({ success: -4, msg: 'password_not_correct_failed_to_login' });
                }
                
                user.updateLastLogin(userInfo.user_id, userInfo.email, function(results_1) {
                    if (results_1.success === 1) {
                        connection_register.addLoginHistory(userInfo.user_id, req.ip.split('ffff:')[1], function(results_2) {
                            if (results_2.success === 1) {
                                return res.json({ success: 1, user: userInfo });
                            } else if (results_2.success === 0) {
                                return res({ success: 0, msg: results_2.msg });
                            } else if (results_2.success === -1) {
                                return res({ success: 0, msg: results_2.msg });
                            }
                        });
                    } else if (results_1.success === 0) {
                        return res({ success: 0, msg: 'invalid parameters for last login' });
                    } else if (results_1.success === -1) {
                        return res({ success: 0, msg: results_1.msg });
                    }
                });
            } else if (results.success === 0) {
                return res({ success: 0, msg: 'invalid parameters for email' });
            } else if (results.success === -1) {
                return res.json({ success: -5, msg: 'database query error when getting user info!' });
            } else if (results.success === -2) {
                return res.json({ success: -2, msg: 'there_are_no_users_for_email' });
            }
        });
    },

    test: function() {
        console.log("this is a test");
    },

    verifyemail: function(req, res, next) {
        // create reusable transporter object using the default SMTP transport
        connection.query("SELECT activation_code FROM users WHERE email = ?", [req.body.email], function(err, results, fields) {
            if (err) {
                return res.json({ status: -1, msg: "DB error" });
            }

            let transporter = nodemailer.createTransport({
                host: 'smtp.vendasity.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'info@vendasity.com', // generated ethereal user
                    pass: 'm92894cNDy' // generated ethereal password
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            transporter.use('compile', hbs({
                viewPath: 'app/views',
                extName: '.hbs'
            }));

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"VendasitySupportTeam" <info@vendasity.com>', // sender address
                to: req.body.email, // list of receivers
                subject: 'Email Verification', // Subject line
                //text: req.body.token // plain text body
                //html: '<b>'+req.body.token+'</b>', // html body
                template: 'verify',
                context: {
                    token: results[0]['activation_code']
                }
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                return res.json({ success: 1, message: 'email sent' });
            });
        });
    },

    codeVerify: function(req, res, next) {
        console.log(req.body.password);
        connection.query('SELECT * FROM users WHERE activation_code = ?', [req.body.password], function(err, results, fields) {
            if (err) {
                return res.json({ status: 0, msg: "DB Error!" });
            }
            if (results.length == 0) {
                return res.json({ status: -1, msg: "Wrong Code!" });
            } else {
                connection.query('UPDATE users SET active = 1 WHERE activation_code = ?', [req.body.password], function() {
                    if (err) {
                        return res.json({ status: -2, msg: "Update Error!" });
                    }
                    return res.json({ status: 1, msg: "Verified Successfully!" });
                });
            }
        });
    },

    getUser: function(req, res, next) {
        var query = 'SELECT A.*, C.name AS account_type FROM users AS A LEFT JOIN users_groups AS B ON A.id=B.user_id LEFT JOIN groups AS C ON B.group_id=A.id WHERE A.id=?';
        connection.query(query, [req.body.id], function(err, results, fields) {
            if (err) {
                return res.json({ status: -1 });
            }
            return res.json({ status: 1, data: results });
        })
    },

    updateUser: function(req, res, next) {
        var updateUserInfo = {
            email: req.body.user.email,
            phone: req.body.user.phone,
            address: req.body.user.address,
            address_sub: req.body.user.address_sub,
            city: req.body.user.city
        }
        connection.query('UPDATE users SET ? WHERE id=?', [updateUserInfo, req.body.id], function(err, results, fields) {
            if (err) {
                return res.json({ status: -1 });
            }
            return res.json({ status: 1, data: results });
        });
    },

    checkCanUpdatePassword: function(req, res, next) {
        let _password = req.body.password;
        let _newpassword = req.body.newpassword;
        let _confirmpassword = req.body.confirmpassword;

        connection.query('SELECT * FROM users WHERE id=?', [req.body.id], function(err, results) {
            if (err) {
                return res.json({ status: -1 });
            }
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(_password, salt);
            let curPwd = results[0]['password'];
            if (curPwd == null)
                curPwd = "";
            if (curPwd != "") {
                if (!bcrypt.compareSync(_password, curPwd)) {
                    return res.json({ status: -2 });
                }
            }

            if (_newpassword !== _confirmpassword) {
                return res.json({ status: -3 });
            }
            connection.query('UPDATE users SET password=? WHERE id=?', [_confirmpassword, req.body.id], function(err, results, fields) {
                if (err) {
                    return res.json({ status: -4 });
                }
                return res.json({ status: 1, data: results });
            });
        });

    },

    getEmailBySocketId: function(req, res, next) {
        user.getEmailBySocketId(req.body.socket_id, function(results) {
            return res.json(results);
        });
    },

    getActivestatus: function(req, res, next) {
        connection.query('SELECT active FROM users WHERE email = ?', [req.body.email], function(err, results, fields) {
            if (err) {
                return res.json({ status: -1, msg: "Database Error!" })
            }
            return res.json({ status: 1, data: results });
        })
    },

    getBalance: function(req, res, next) {
        user.getBalanceByEmail(req.body.email, function(results) {
            return res.json(results);
        });
    },

    getLogintoken: function(req, res, next) {
        const token = new TokenGenerator();
        var logintoken = token.generate();

        // Added by Jack (for offline test) ...
        return res.json({ success: 1, message: 'email sent', logintoken: logintoken });

        // Commented by Jack ...
        /*let transporter = nodemailer.createTransport({
            host: 'smtp.vendasity.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'info@vendasity.com', // generated ethereal user
                pass: 'm92894cNDy' // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        transporter.use('compile', hbs({
            viewPath: 'app/views',
            extName: '.hbs'
        }));

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"VendasitySupportTeam" <info@vendasity.com>', // sender address
            to: req.body.email, // list of receivers
            subject: 'Email Verification', // Subject line
            //text: req.body.token // plain text body
            //html: '<b>'+req.body.token+'</b>', // html body
            template: 'twofa',
            context: {
                logintoken: logintoken
            }
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            return res.json({ success: 1, message: 'email sent', logintoken : logintoken });
        });*/
    },

    googleOAuth: async function(req, res, next) {
        const CLIENT_ID = '163812453324-2ujg6q05r77alht3m0tsqc3mej63aqts.apps.googleusercontent.com';

        const client = new OAuth2Client(CLIENT_ID);

        const ticket = await client.verifyIdToken({
            idToken: req.body.token,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (payload.aud == CLIENT_ID) {
            connection.query('SELECT *, users_groups.group_id as user_role FROM users LEFT JOIN users_groups ON users.id=users_groups.user_id WHERE google_id=?', payload.sub, function(err, results, fields) {
                if (err) {
                    return res.json({ status: -1, msg: "DB connection or Query Error!" });
                }

                if (results.length == 0) {
                    var userid = '';
                    var google_userinfo = {
                        google_id: payload.sub,
                        email: payload.email,
                        first_name: payload.family_name,
                        last_name: payload.given_name,
                        active: 1,
                        member_ship: 0,
                        avatar: payload.picture
                    }
                    connection.query('INSERT INTO users SET ?', google_userinfo, function(err, results, fields) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        userid = results.insertId;

                        connection.query('SELECT * FROM users_groups WHERE user_id=?', userid, function(err, results) {
                            if (results.length == 0) {

                                var users_groups = {
                                    user_id: userid,
                                    group_id: 2
                                }
                                connection.query('INSERT INTO users_groups SET ?', users_groups, function(err, results) {
                                    if (err) {
                                        console.log(err);
                                        return;
                                    }
                                    connection.query('SELECT *, users_groups.group_id as user_role FROM users LEFT JOIN users_groups ON users.id=users_groups.user_id WHERE google_id=?', payload.sub, function(err, results, fields) {
                                        return res.json({ status: 1, data: results, msg: "Welcome To Vendasity!" });
                                    });
                                })
                            }
                        })
                    })
                } else {
                    return res.json({ status: 2, data: results, msg: "Welcome To Vendasity!" });
                }
            });
        } else {
            return res.json({ status: 0, msg: "Invalid Token!" });
        }
    },

    contact: function(res, req, next) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.vendasity.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'info@vendasity.com', // generated ethereal user
                pass: 'm92894cNDy' // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        var msg = '';
        msg += 'Username : ' + req.body.name + '<br />';
        msg += 'Phone : ' + req.body.phone + '<br />';
        msg += req.body.message;

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"VendasitySupportTeam" <' + req.body.email + '>', // sender address
            to: 'info@vendasity.com', // list of receivers
            subject: 'Email Verification', // Subject line
            text: msg // plain text body
                //html: '<b>'+req.body.token+'</b>', // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            return res.json({ success: 1, message: 'email sent' });
        });
    },

    getEmailById: function(req, res, next) {
        user.getEmailById(req.body.id, function(results) {
            return res.json(results);
        })
    }

}