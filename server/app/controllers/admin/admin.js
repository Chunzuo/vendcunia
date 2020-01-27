'use strict';

const nodemailer = require('nodemailer');
const TokenGenerator = require('uuid-token-generator');

var admin = require('../../models/admin');

var bcrypt = require('bcryptjs'),
    mysql = require('mysql')

var connection;

module.exports = {

    setConnection: function(con) {
        connection = con;
        user.setConnection(con);
    },

    register: function(req, res, next) {
        const tokgen = new TokenGenerator();
        var register_token = tokgen.generate();

        connection.query('SELECT * FROM users WHERE email=?', [req.body.email], function(err, results) {
            if (results.length > 0) {
                return res.json({ success: -2, msg: 'email_already_exists' })
            } else {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(req.body.password, salt);
                var register_token = tokgen.generate();
                var user = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: hash,
                    salt: salt,
                    active: 0,
                    activation_code: register_token.substr(0, 6),
                    created_on: mysql.raw('CURRENT_TIMESTAMP()')
                }
                connection.query('INSERT INTO users SET ?', user, function(err, results) {
                    if (err) {
                        console.log(err)
                        return;
                    }

                    var createdUserId = results.insertId;
                    connection.query('SELECT * FROM users_groups WHERE user_id=?', [createdUserId], function(err, results) {
                        if (results.length > 0) {
                            return res.json({ success: 1 });
                        }
                        var users_groups = {
                            user_id: createdUserId,
                            group_id: 1
                        }
                        connection.query('INSERT INTO users_groups SET ?', users_groups, function(err, results) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            return res.json({ success: 1 });
                        })
                    })
                })
            }
        })
    },

    login: function(req, res, next) {
        var query = `
            SELECT *, admin_groups.name AS group_name, admin_groups.description AS group_description, admin_users_groups.group_id AS group_id
            FROM admin_users
            LEFT JOIN admin_groups
        `;
        connection.query('SELECT *, users_groups.group_id as user_role FROM users LEFT JOIN users_groups ON users.id=users_groups.user_id WHERE email = ?', [req.body.email], function(err, results, fields) {
            var user = results[0];
            if (user == null) {
                return res.json({ success: -2, msg: 'there_are_no_users_for_email' });
            } else if (user.active == 0) {
                return res.json({ success: -3, msg: 'you_are_inactive_user' });
            } else if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.json({ success: -4, msg: 'password_not_correct_failed_to_login' });
            }
            var time = mysql.raw('CURRENT_TIMESTAMP()');
            var token = bcrypt.hashSync(user.email + '_' + time, 8);
            connection.query('UPDATE users SET last_login=?, token=?', [time, token], function(err) {
                if (err) {
                    console.log(err);
                    return;
                }
                connection.query('INSERT INTO connection_register SET ?', { user_id: user.user_id, connection_time: new Date(), ip_address: req.ip.split('ffff:')[1] }, function(err, results) {
                    // if (err) {
                    //     return res.json({ status: -5, msg: err });
                    // }
                    // return res.json({ status: 1, msg: 'success' });
                });
                return res.json({ success: 1, user: user });
            });
        });
    }

}