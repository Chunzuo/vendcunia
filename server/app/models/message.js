"use strict";

var mysql = require('mysql');
var product = require('../models/product');

var connection;

module.exports = {

    setConnection: function(con) {
        connection = con;
    },

    send: function(sender_email, receiver_email, title, content, discount_id, res) {
        if (!sender_email || typeof sender_email === 'undefined' || sender_email === null || sender_email === '') {
            return res({ success: 0, msg: 'invalid parameters for socket id' });
        }

        if (!receiver_email || typeof receiver_email === 'undefined' || receiver_email === null || receiver_email === '') {
            return res({ success: 0, msg: 'invalid parameters for socket id' });
        }

        if (!title || typeof title === 'undefined' || title === null || title === '') {
            return res({ success: 0, msg: 'invalid parameters for socket id' });
        }

        if (!content || typeof content === 'undefined' || content === null || content === '') {
            return res({ success: 0, msg: 'invalid parameters for socket id' });
        }

        if (typeof discount_id === 'undefined' || discount_id === null || discount_id === '') {
            return res({ success: 0, msg: 'invalid parameters for socket id' });
        }

        if (discount_id === 0) {
            var messageData = {
                sender_email: sender_email,
                receiver_email: receiver_email,
                title: title,
                content: content,
                discount_id: discount_id,
                sendTime: mysql.raw('NOW()')
            };
            connection.query('INSERT INTO message SET ?', messageData, function(err, results) {
                if (err) {
                    return res({ status: -1, msg: err.stack });
                }
                return res({ status: 1 });
            });
        } else {
            product.getDiscountProductInfo(discount_id, function(res_1) {
                if (res_1.status === 1) {
                    var discountInfo = res_1.discount;
                    
                    var content = sender_email;
                    if (title === 'Discount Offer') {
                        content = content + ' has sent discount offer to ' + receiver_email + ' for product ' + discountInfo.product_name + ' with price ' + discountInfo.discount_price;
                    } else {
                        if (title === 'accept') {
                            content += ' accepted your discount offer (';
                        } else if (title === 'reject') {
                            content += ' rejected your discount offer (';
                        }
                        content = content + 'price ' + discountInfo.discount_price + ' for product ' + discountInfo.product_name + ').';
                    }

                    var msgTitle = 'Discount Offer';
                    if (title === 'Discount Offer') {
                    } else {
                        if (title === 'accept') {
                            msgTitle += ' Accepted';
                        } else if (title === 'reject') {
                            msgTitle += ' Rejected';
                        }
                    }

                    var messageData = {
                        sender_email: sender_email,
                        receiver_email: receiver_email,
                        title: msgTitle,
                        content: content,
                        discount_id: discount_id,
                        sendTime: mysql.raw('NOW()')
                    };
                    connection.query('INSERT INTO message SET ?', messageData, function(err, results) {
                        if (err) {
                            return res({ status: -1, msg: err.stack });
                        }
                        return res({ status: 1 });
                    });
                }
            });
        }
    },

    getMessageInfoById: function(messageId, res) {
        if (!messageId || typeof messageId === 'undefined' || messageId === null || messageId === '') {
            return res({ success: 0, msg: 'invalid parameters for socket id' });
        }

        connection.query('SELECT * FROM message WHERE id = ?', [messageId], function(err, results, fields) {
            if (err) {
                return res({ success: -1, msg: 'database query error when getting message info!' });
            }
            if (results.length == 0) {
                return res({ success: -2, msg: 'no message exist for the message id!' });
            } else {
                return res({ success: 1, msg: 'succeed to get message info!', messageInfo: results[0] });
            }
        })
    }

}