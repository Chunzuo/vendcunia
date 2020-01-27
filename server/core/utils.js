"use strict";

var mysql = require('mysql');

var connection;

module.exports = {

    setConnection: function(con) {
        connection = con;
    },

    getContacts: function(email, res) {
        if (!email || email === null || email === '') {
            return res(email, []);
        }

        var query = `
            SELECT A.sender_id, A.receiver_id, A.created_at, A.is_accept, B.login_name AS sender_login_name, C.login_name AS receiver_login_name,
                B.email AS sender_email, C.email AS receiver_email, B.first_name AS sender_first_name, C.first_name AS receiver_first_name,
                B.last_name AS sender_last_name, C.last_name AS receiver_last_name, B.is_online AS sender_is_online, C.is_online AS receiver_is_online,
                B.socket_id AS sender_socket_id, C.socket_id AS receiver_socket_id
            FROM contacts A
            LEFT JOIN users B ON A.sender_id = B.id
            LEFT JOIN users C ON A.receiver_id = C.id
        `;

        connection.query(query + ' WHERE (B.email = ? OR C.email = ?) AND A.is_accept=1', [email, email], function(err, results, fields) {
            if (results.length === 0) {
                return res(email, []);
            } else {
                let contacts = [];
                for (let i = 0; i < results.length; i++) {
                    let status = 3; // offline

                    if (results[i].sender_email === email) {
                        if (results[i].receiver_socket_id !== null)
                            status = 0; // online

                        contacts.push({
                            id: results[i].receiver_socket_id,
                            displayName: results[i].receiver_email,
                            status: status,
                            avatar: null
                        });
                    } else {
                        if (results[i].sender_socket_id !== null)
                            status = 0; // online

                        contacts.push({
                            id: results[i].sender_socket_id,
                            displayName: results[i].sender_email,
                            status: status,
                            avatar: null
                        });
                    }
                }
                return res(email, contacts);
            }
        })
    },

    getContacts_all: function(email, res) {
        if (!email || email === null || email === '') {
            return res(email, []);
        }

        var query = `
            SELECT A.sender_id, A.receiver_id, A.created_at, A.is_accept, B.login_name AS sender_login_name, C.login_name AS receiver_login_name,
                B.email AS sender_email, C.email AS receiver_email, B.first_name AS sender_first_name, C.first_name AS receiver_first_name,
                B.last_name AS sender_last_name, C.last_name AS receiver_last_name, B.is_online AS sender_is_online, C.is_online AS receiver_is_online,
                B.socket_id AS sender_socket_id, C.socket_id AS receiver_socket_id
            FROM contacts A
            LEFT JOIN users B ON A.sender_id = B.id
            LEFT JOIN users C ON A.receiver_id = C.id
        `;

        connection.query(query + ' WHERE B.email = ? OR C.email = ?', [email, email], function(err, results, fields) {
            if (results.length === 0) {
                return res(email, []);
            } else {
                let contacts = [];
                for (let i = 0; i < results.length; i++) {
                    let status = 3; // offline

                    if (results[i].sender_email === email) {
                        if (results[i].receiver_socket_id !== null)
                            status = 0; // online

                        contacts.push({
                            id: results[i].receiver_socket_id,
                            displayName: results[i].receiver_email,
                            status: status,
                            avatar: null
                        });
                    } else {
                        if (results[i].sender_socket_id !== null)
                            status = 0; // online

                        contacts.push({
                            id: results[i].sender_socket_id,
                            displayName: results[i].sender_email,
                            status: status,
                            avatar: null
                        });
                    }
                }
                return res(email, contacts);
            }
        })
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
    }

}