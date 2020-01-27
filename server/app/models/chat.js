"use strict";

var mysql = require('mysql');
var connection;

module.exports = {

    setConnection: function(con) {
        connection = con;
    },

    addChatMessage: function(sender_email, receiver_email, message, res) {
        if (!sender_email || typeof sender_email === 'undefined' || sender_email === null || sender_email === '') {
            return res({ success: 0, msg: 'invalid parameters for sender email' });
        }

        if (!receiver_email || typeof receiver_email === 'undefined' || receiver_email === null || receiver_email === '') {
            return res({ success: 0, msg: 'invalid parameters for receiver email' });
        }

        if (!message || typeof message === 'undefined' || message === null || message === '') {
            return res({ success: 0, msg: 'invalid parameters for chat message' });
        }

        var sender_id, receiver_id;
        connection.query('SELECT id FROM users WHERE email = ?', [sender_email], function(err, results, fields) {
            if (err) {
                return res({ success: -1, msg: 'database query error when selecting sender id!' });
            }
            if (results.length == 0) {
                return res({ success: -2, msg: 'no user exist for sender email!' });
            } else {
                sender_id = results[0].id;

                connection.query('SELECT id FROM users WHERE email = ?', [receiver_email], function(err_1, results_1, fields_1) {
                    if (err_1) {
                        return res({ success: -3, msg: 'database query error when selecting receiver id!' });
                    }
                    if (results_1.length == 0) {
                        return res({ success: -4, msg: 'no user exist for receiver email!' });
                    } else {
                        receiver_id = results_1[0].id;

                        var chatMessageInfo = {
                            sender_id: sender_id,
                            receiver_id: receiver_id,
                            message: message,
                            created_at: mysql.raw('UNIX_TIMESTAMP()'),
                            is_read: 0
                        }

                        connection.query('INSERT INTO chat_histories SET ?', chatMessageInfo, function(err_2, results_2, fields_2) {
                            if (err_2) {
                                return res({ success: -5, msg: 'database query error when inserting chat message!' });
                            }
                            return res({ success: 1 });
                        })
                    }
                })
            }
        })
    }

}