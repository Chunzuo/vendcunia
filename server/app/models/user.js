"use strict";

const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const TokenGenerator = require('uuid-token-generator');

var settings = require('../../config/settings');

var connection;

module.exports = {

    setConnection: function(con) {
        connection = con;
    },

    getUserInfoByEmail: function(email, res) {
        if (!email || typeof email === 'undefined' || email === null || email === '') {
            return res({ success: 0, msg: 'invalid parameters for email' });
        }

        const query = `
            SELECT *, users_groups.group_id as user_role 
            FROM users 
            LEFT JOIN users_groups ON users.id = users_groups.user_id
            WHERE email = ?
        `;
        connection.query(query, [email], function(err, results, fields) {
            if (err) {
                return res({ success: -1, msg: 'database query error when getting user info!' });
            }
            if (results.length == 0) {
                return res({ success: -2, msg: 'no user exist for email! address', user: null });
            } else {
                return res({ success: 1, msg: 'succeed to get user info!', user: results[0] });
            }
        });
    },

    getEmailBySocketId: function(socketId, res) {
        if (!socketId || typeof socketId === 'undefined' || socketId === null || socketId === '') {
            return res({ success: 0, msg: 'invalid parameters for socket id' });
        }

        connection.query('SELECT email FROM users WHERE socket_id = ?', [socketId], function(err, results, fields) {
            if (err) {
                return res({ success: -1, msg: 'database query error when selecting receiver id!' });
            }
            if (results.length == 0) {
                return res({ success: -2, msg: 'no user exist for receiver email!', email: '' });
            } else {
                return res({ success: 1, msg: 'succeed to get email!', email: results[0].email });
            }
        })
    },

    getSocketIdByEmail: function(email, res) {
        if (!email || typeof email === 'undefined' || email === null || email === '') {
            return res({ success: 0, msg: 'invalid parameters for email' });
        }

        connection.query('SELECT socket_id FROM users WHERE email = ?', [email], function(err, results, fields) {
            if (err) {
                return res({ success: -1, msg: 'database query error when selecting socket id!' });
            }
            if (results.length == 0) {
                return res({ success: -2, msg: 'no user exist for email address!', email: '' });
            } else {
                return res({ success: 1, msg: 'succeed to get email!', socket_id: results[0].socket_id });
            }
        })
    },

    getBalanceByEmail: function(email, res) {
        if (!email || typeof email === 'undefined' || email === null || email === '') {
            return res({ success: 0, msg: 'invalid parameters for email' });
        }

        connection.query('SELECT balance FROM users WHERE email = ?', [email], function(err, results, fields) {
            if (err) {
                return res({ success: -1, msg: 'database query error when selecting balance!' });
            }
            if (results.length == 0) {
                return res({ success: -2, msg: 'no user exist for email address!', balance: '' });
            } else {
                return res({ success: 1, msg: 'succeed to get balance!', balance: results[0].balance });
            }
        })
    },

    getBalanceById: function(userId, res) {
        if (!userId || typeof userId === 'undefined' || userId === null || userId === '') {
            return res({ success: 0, msg: 'invalid parameters for user id' });
        }

        connection.query('SELECT balance FROM users WHERE id = ?', [userId], function(err, results, fields) {
            if (err) {
                return res({ success: -1, msg: 'database query error when selecting balance!' });
            }
            if (results.length == 0) {
                return res({ success: -2, msg: 'no user exist for user id!', balance: '' });
            } else {
                return res({ success: 1, msg: 'succeed to get balance!', balance: results[0].balance });
            }
        })
    },

    paidTo: function(fromId, toId, price, res) {
        if (!fromId || typeof fromId === 'undefined' || fromId === null || fromId === '') {
            return res({ success: 0, msg: 'invalid parameters for from id' });
        }

        if (!toId || typeof toId === 'undefined' || toId === null || toId === '') {
            return res({ success: 0, msg: 'invalid parameters for to id' });
        }

        if (!price || typeof price === 'undefined' || price === null || price === '' || price === 0) {
            return res({ success: 0, msg: 'invalid parameters for to id' });
        }

        connection.query('UPDATE users SET balance = balance - ? WHERE id = ?', [price, fromId], function(err, results) {
            if (err) {
                return res({ success: -1, msg: err });
            }
            connection.query('UPDATE users SET balance = balance + ? WHERE id = ?', [price, toId], function(err, results) {
                if (err) {
                    return res({ success: -2, msg: err });
                }
                return res({ success: 1, msg: 'User ' + fromId + ' paid user ' + toId });
            })
        });
    },

    getEmailById: function(id, res) {
        if (!id || typeof id === 'undefined' || id === null || id === '') {
            return res({ success: 0, msg: 'invalid parameters for id' });
        }

        connection.query('SELECT email FROM users WHERE id = ?', [id], function(err, results, fields) {
            if (err) {
                return res({ success: -1, msg: 'database query error when selecting email!' });
            }
            if (results.length == 0) {
                return res({ success: -2, msg: 'no user exist for id!', email: '' });
            } else {
                return res({ success: 1, msg: 'succeed to get email!', email: results[0].email });
            }
        })
    },

    updateLastLogin: function(userId, email, res) {
        if (!userId || typeof userId === 'undefined' || userId === null || userId === '') {
            return res({ success: 0, msg: 'invalid parameters for user id' });
        }

        if (!email || typeof email === 'undefined' || email === null || email === '') {
            return res({ success: 0, msg: 'invalid parameters for email' });
        }

        var now = new Date(); 
        var nowSec = parseInt(now.getTime() / 1000, 10);
        var token = bcrypt.hashSync(email + '_' + nowSec, 8);

        connection.query('UPDATE users SET last_login = ?, token = ? WHERE id = ?', [nowSec, token, userId], function(err, results) {
            if (err) {
                return res({ success: -1, msg: err });
            }

            return res({ success: 1, msg: 'Successfully updated the last login time and token for the user' });
        });
    },

    addNewUser: function(userInfo, res) {
        if (!userInfo || typeof userInfo === 'undefined' || userInfo === null || userInfo === '') {
            return res({ success: 0, msg: 'invalid parameters for user info' });
        }

        connection.query('INSERT INTO users SET ?', userInfo, function(err, results) {
            if (err) {
                return res({ success: -1, msg: 'database query error when inserting new user!' });
            }

            return res({ success: 1, msg: 'Successfully added new user', newUserId: results.insertId });
        });
    }

}