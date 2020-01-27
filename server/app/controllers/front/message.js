'use strict';

var mysql = require('mysql');
var message = require('../../models/message');

var connection;
module.exports = {
    setConnection: function(con) {
        connection = con;
        message.setConnection(con);
    },

    getList: function(req, res, next) {
        var curPage = req.body.curPage,
            email = req.body.email,
            type = req.body.type;
        // start = (curPage - 1) * limit;

        var query = 'SELECT A.*, IFNULL(B.email, "") AS senderName, ';
        query += 'IFNULL(C.login_name, "") AS receiverName ';
        query += 'FROM message AS A ';
        query += 'LEFT JOIN users B ON A.sender_email = B.email ';
        query += 'LEFT JOIN users C ON A.receiver_email = C.email ';

        if (type == 1) {
            query += 'WHERE A.sender_email = ?';
        } else {
            query += 'WHERE A.receiver_email = ?';
        }

        query += ' ORDER BY a.id DESC';

        connection.query(query, [email], function(err, result) {
            if (err) {
                return res.json({ success: -1, msg: err });
            } else {
                return res.json(result);
            }
        });
    },

    send: function(req, res, next) {
        if (!req.body.sender_email || typeof req.body.sender_email === 'undefined' || req.body.sender_email === null || req.body.sender_email === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.receiver_email || typeof req.body.receiver_email === 'undefined' || req.body.receiver_email === null || req.body.receiver_email === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.title || typeof req.body.title === 'undefined' || req.body.title === null || req.body.title === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.content || typeof req.body.content === 'undefined' || req.body.content === null || req.body.content === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.discount_id || typeof req.body.discount_id === 'undefined' || req.body.discount_id === null || req.body.discount_id === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        message.send(req.body.sender_email,
            req.body.receiver_email,
            req.body.title,
            req.body.content,
            req.body.discount_id,
            function(results) {
                return res.json(results);
            })
    },

    delete: function(req, res, next) {
        var ids = req.body.ids;
        var str = ids;
        var arr = str.split(",");

        if (arr.length > 0) {
            var query = 'DELETE FROM message WHERE id IN (' + arr + ')';
            connection.query(query, function(err, result) {
                if (err) {
                    return res.json({ success: -1, msg: err });
                } else {
                    return res.json({ success: 1 });
                }
            });
        } else {
            return res.json({ success: -1, msg: '' });
        }
    },

    getMessageInfoById: function(req, res, next) {
        if (!req.body.messageId || typeof req.body.messageId === 'undefined' || req.body.messageId === null || req.body.messageId === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        message.getMessageInfoById(req.body.messageId, function(results) {
            return res.json(results);
        });
    },
    /**
     * Add by Michael
     */
    getBids: function(req, res, next) {
        var query = `
            SELECT pb.buyer_id, pb.bid_time, u.email senderEmail, u.first_name bidderName, p.id productId
            FROM product_bids pb
            INNER JOIN products p ON p.id=pb.product_id
            LEFT JOIN users u ON pb.buyer_id=u.id
            WHERE p.duration * 24 * 3600 <= UNIX_TIMESTAMP() - p.created_on AND p.created_by=?
            GROUP BY pb.buyer_id
            ORDER BY pb.bid_time DESC
            LIMIT 1
        `;
        connection.query(query, [req.body.userId], function(err, results) {
            if (err) {
                return res.json({ status: -1 });
            }
            if (results.length < 1) {
                return res.json({ status: 1 });
            } else {
                connection.query('SELECT email FROM users WHERE id=?', [req.body.userId], function(err, users) {
                    var receiverEmail = users[0].email;
                    // insert new message
                    results.forEach(data => {
                        var messageObj = {
                            sender_email: data.senderEmail,
                            receiver_email: receiverEmail,
                            title: 'About bid informatin',
                            content: 'Bidder is ' + data.bidderName,
                            sendTime: mysql.raw('NOW()')
                        }
                        connection.query('INSERT INTO message SET ?', messageObj, function(err, results) {
                            if (err) {
                                return res.json({ status: -1 });
                            }
                            connection.query('DELETE FROM product_bids WHERE product_id=?', [data.productId], function(err) {
                                if (err) {
                                    return res.json({ status: -1 });
                                }
                                return res.json({ status: 1 });
                            })
                        })
                    })

                })

            }
        });
    }

};