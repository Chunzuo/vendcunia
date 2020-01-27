'use strict';

var mysql = require('mysql');
var contact = require('../../models/contact');

var connection;

module.exports = {

    setConnection: function(con) {
        connection = con;
        contact.setConnection(con);
    },

    getContacts: function(req, res, next) {
        contact.getContacts(req.body.email, function(receiver_email, res_1) {
            return res.json(res_1);
        })
    },

    send: function(req, res, next) {
        if (!req.body.sender_email || typeof req.body.sender_email === 'undefined' || req.body.sender_email === null || req.body.sender_email === '') {
            return res.json({ success: 0, msg: 'invalid parameters' });
        }

        if (!req.body.receiver_email || typeof req.body.receiver_email === 'undefined' || req.body.receiver_email === null || req.body.receiver_email === '') {
            return res.json({ success: 0, msg: 'invalid parameters' });
        }

        if (req.body.sender_email == req.body.receiver_email) {
            return res.json({ success: 0, msg: 'sender email and receiver email should be different.' });
        }

        var sender_id = 0,
            receiver_id = 0;

        var selectQuery_1 = 'SELECT * FROM users WHERE email = ?';
        connection.query(selectQuery_1, [req.body.sender_email], function(err, results, fields) {
            if (results.length === 0) {
                return res.json({ success: -1, msg: 'no users for sender email address.' });
            } else {
                sender_id = results[0].id;

                var selectQuery_2 = 'SELECT * FROM users WHERE email = ?';
                connection.query(selectQuery_2, [req.body.receiver_email], function(err, results_1, fields) {
                    if (results_1.length === 0) {
                        return res.json({ success: -2, msg: 'no users for receiver email address.' });
                    } else {
                        receiver_id = results_1[0].id;

                        var selectQuery_3 = 'SELECT * FROM contacts WHERE (sender_id = ? AND receiver_id = ?) OR (receiver_id = ? AND sender_id = ?)';
                        connection.query(selectQuery_3, [sender_id, receiver_id, sender_id, receiver_id], function(err, results_3, fields) {
                            if (results_3.length > 0) {
                                return res.json({ success: -3, msg: 'same contact request exists.' });
                            } else {
                                var contactObj = {
                                    sender_id: sender_id,
                                    receiver_id: receiver_id,
                                    created_at: mysql.raw('UNIX_TIMESTAMP()'),
                                    is_accept: 0
                                };

                                var sendQuery = 'INSERT INTO contacts SET ?';
                                connection.query(sendQuery, contactObj, function(err, results) {
                                    if (err) {
                                        return res.json({ success: -4, msg: 'failed to send contact request.' });
                                    }
                                    return res.json({ success: 1, msg: 'contact request has been successfully sent.' });
                                })
                            }
                        })
                    }
                })
            }
        })
    },

    accept: function(req, res, next) {
        if (!req.body.sender_email || typeof req.body.sender_email === 'undefined' || req.body.sender_email === null || req.body.sender_email === '') {
            return res.json({ success: 0, msg: 'invalid parameters' });
        }

        if (!req.body.receiver_email || typeof req.body.receiver_email === 'undefined' || req.body.receiver_email === null || req.body.receiver_email === '') {
            return res.json({ success: 0, msg: 'invalid parameters' });
        }

        var sender_id = 0,
            receiver_id = 0;

        var selectQuery_1 = 'SELECT * FROM users WHERE email = ?';
        connection.query(selectQuery_1, [req.body.sender_email], function(err, results, fields) {
            if (results.length === 0) {
                return res.json({ success: -1, msg: 'no users for sender email address.' });
            } else {
                sender_id = results[0].id;

                var selectQuery_2 = 'SELECT * FROM users WHERE email = ?';
                connection.query(selectQuery_2, [req.body.receiver_email], function(err, results_1, fields) {
                    if (results_1.length === 0) {
                        return res.json({ success: -2, msg: 'no users for receiver email address.' });
                    } else {
                        receiver_id = results_1[0].id;

                        connection.query('UPDATE contacts SET is_accept = 1 WHERE sender_id = ? AND receiver_id = ?', [sender_id, receiver_id], function(err, results) {
                            if (err) {
                                return res.json({ success: -3, msg: 'failed to accept contact request.' });
                            }
                            return res.json({ success: 1, msg: 'contact request has been successfully accepted.' });
                        })
                    }
                })
            }
        })
    },

    reject: function(req, res, next) {
        if (!req.body.sender_email || typeof req.body.sender_email === 'undefined' || req.body.sender_email === null || req.body.sender_email === '') {
            return res.json({ success: 0, msg: 'invalid parameters' });
        }

        if (!req.body.receiver_email || typeof req.body.receiver_email === 'undefined' || req.body.receiver_email === null || req.body.receiver_email === '') {
            return res.json({ success: 0, msg: 'invalid parameters' });
        }

        var sender_id = 0,
            receiver_id = 0;

        var selectQuery_1 = 'SELECT * FROM users WHERE email = ?';
        connection.query(selectQuery_1, [req.body.sender_email], function(err, results, fields) {
            if (results.length === 0) {
                return res.json({ success: -1, msg: 'no users for sender email address.' });
            } else {
                sender_id = results[0].id;

                var selectQuery_2 = 'SELECT * FROM users WHERE email = ?';
                connection.query(selectQuery_2, [req.body.receiver_email], function(err, results_1, fields) {
                    if (results_1.length === 0) {
                        return res.json({ success: -2, msg: 'no users for receiver email address.' });
                    } else {
                        receiver_id = results_1[0].id;

                        connection.query('DELETE FROM contacts WHERE sender_id = ? AND receiver_id = ?', [sender_id, receiver_id], function(err, results) {
                            if (err) {
                                return res.json({ success: -3, msg: 'failed to reject contact request.' });
                            }
                            return res.json({ success: 1, msg: 'contact request has been successfully rejected.' });
                        })
                    }
                })
            }
        })
    },
    /**
     * Created by Michael
     */
    incoming: function(req, res, next) {
        var query = `
            SELECT A.id, B.email
            FROM contacts AS A
            LEFT JOIN users AS B ON A.sender_id=B.id
            WHERE receiver_id = ? AND is_accept = 0
        `;
        connection.query(query, [req.body.receiver_id], function(err, results) {
            if (err) {
                return res.json({ status: -1, msg: err.stack });
            }
            return res.json(results);
        })
    },
    acceptIncoming: function(req, res, next) {
        connection.query('UPDATE contacts SET is_accept = 1 WHERE id=?', [req.body.id], function(err, results) {
            if (err) {
                return res.json({ status: -1, msg: err.stack });
            }
            return res.json({ status: 1 });
        })
    },
    rejectIncoming: function(req, res, next) {
        connection.query('DELETE FROM contacts WHERE id=?', [req.body.id], function(err, results) {
            if (err) {
                return res.json({ status: -1, msg: err.stack });
            }
            return res.json({ status: 1 });
        })
    }
}