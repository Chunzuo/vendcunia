'use strict';

var mysql = require('mysql');

var product = require('../../models/product');

var connection;

module.exports = {

    setConnection: function(con) {
        connection = con;
        product.setConnection(con);
    },

    getOverViewInfo: function(req, res, next) {
        var userId = req.body.userId;
        var salesCount = 0,
            ordersCount = 0,
            shippingCount = 0,
            profit = 0;
        var query = 'SELECT a.id, a.product_id, a.status, a.ordering_price, a.quantity FROM orders a ';
        query += 'INNER JOIN products b ON a.product_id = b.id ';
        query += 'WHERE 1 ';
        query += ' AND b.created_by = ' + userId;

        connection.query(query, function(err, orderList) {
            if (err) {

            } else {
                for (var i = 0; i < orderList.length; i++) {
                    var order = orderList[i];
                    switch (order.status) {
                        case 8:
                        case 7:
                            salesCount++;
                            profit += order.ordering_price * order.quantity;
                            break;
                        case 4:
                            ordersCount++;
                            break;
                        case 6:
                            shippingCount++;
                            break;
                    }
                }
            }
            return res.json({
                success: 1,
                salesCount: salesCount,
                ordersCount: ordersCount,
                shippingCount: shippingCount,
                profit: profit
            });
        });
    },

    getSaleStatisticsInfo: function(req, res, next) {
        var userId = req.body.userId;

        var todayMoney = 0,
            weekMoney = 0,
            monthMoney = 0,
            threeMonthMoney = 0;
        var query = 'SELECT IFNULL(SUM(a.ordering_price * a.quantity), 0) AS money FROM orders a ';
        query += ' INNER JOIN products b ON a.product_id = b.id ';
        query += ' WHERE 1 ';
        query += ' AND (a.status = 7 OR a.status = 8) ';
        query += ' AND b.created_by = ' + userId;
        var where = ' AND DATE_FORMAT(FROM_UNIXTIME(completed_at),"%Y-%m-%d") >= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 0 DAY), "%Y-%m-%d") ';

        connection.query(query + where, function(err, result) {

            if (err) {
                todayMoney = 0;
            } else {
                todayMoney = result[0].money;
            }

            var where = ' AND DATE_FORMAT(FROM_UNIXTIME(completed_at),"%Y-%m-%d") >= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 7 DAY), "%Y-%m-%d") ';

            connection.query(query + where, function(err, result) {

                if (err) {
                    weekMoney = 0;
                } else {
                    weekMoney = result[0].money;
                }

                where = ' AND DATE_FORMAT(FROM_UNIXTIME(completed_at),"%Y-%m-%d") >= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 31 DAY), "%Y-%m-%d") ';

                connection.query(query + where, function(err, result) {

                    if (err) {
                        monthMoney = 0;
                    } else {
                        monthMoney = result[0].money;
                    }

                    where = ' AND DATE_FORMAT(FROM_UNIXTIME(completed_at),"%Y-%m-%d") >= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 90 DAY), "%Y-%m-%d") ';

                    connection.query(query + where, function(err, result) {
                        if (err) {
                            threeMonthMoney = 0;
                        } else {
                            threeMonthMoney = result[0].money;
                        }

                        return res.json({
                            success: 1,
                            today: todayMoney,
                            week: weekMoney,
                            month: monthMoney,
                            threeMonth: threeMonthMoney
                        });
                    });
                });
            });
        });
    },

    getSalesGraphInfo: function(req, res, next) {
        var userId = req.body.userId;
        var year = req.body.year;
        var data = new Array(12);

        for (var i = 0; i < data.length; i++) {
            data[i] = 0;
        }

        var query = 'SELECT a.ordering_price * a.quantity AS money, ';
        query += ' DATE_FORMAT(FROM_UNIXTIME(completed_at),"%Y") AS year, ';
        query += ' DATE_FORMAT(FROM_UNIXTIME(completed_at),"%c") AS month ';
        query += ' FROM orders a ';
        query += ' INNER JOIN products b ON a.product_id = b.id ';
        query += ' WHERE 1 ';
        query += ' AND (a.status = 7 OR a.status = 8)';
        query += ' HAVING year = ' + year;
        query += ' AND b.created_by = ' + userId;

        connection.query(query, function(err, result) {
            if (err) {

            } else {
                for (var i = 0; i < result.length; i++) {
                    var o = result[i];
                    data[o.month - 1] += o.money;
                }
            }

            return res.json(data);
        });
    },

    getOrderList: function(req, res, next) {
        if (!req.body.userId || typeof req.body.userId === 'undefined' || req.body.userId === null || req.body.userId === '') {
            return res.json([]);
        }

        if (typeof req.body.type === 'undefined' || req.body.type === null || req.body.type === '') {
            return res.json([]);
        }

        product.getOrderListForSeller(req.body.userId, req.body.type, function(res_1) {
            if (res_1.status === 1) {
                return res.json(res_1.orders);
            } else {
                return res.json([]);
            }
        });
    },

    getActiveProductList: function(req, res, next) {
        var userId = req.body.userId;

        var query = 'SELECT id, name, starting_price, current_price, discount_price, ';
        query += ' ratings_count, ratings_value, description, quantity, ';
        query += ' FROM_UNIXTIME(created_on) AS created_on FROM products ';
        query += ' WHERE publish = 1 ';
        query += ' AND created_by = ' + userId;
        query += ' ORDER BY id DESC ';

        connection.query(query, function(err, productList) {
            if (err) {
                return res.json([]);
            } else {
                var arr = [];
                for (var i = 0; i < productList.length; i++) {
                    productList[i].images = [];
                    arr.push(productList[i].id);
                }

                query = 'SELECT product_id, image_path FROM product_images ';
                query += ' WHERE product_id IN (' + arr.join(',') + ') ';

                connection.query(query, function(err, imageList) {
                    if (err) {
                        return res.json(productList);
                    }

                    for (var i = 0; i < productList.length; i++) {
                        var product = productList[i];
                        for (var j = 0; j < imageList.length; j++) {
                            var image = imageList[j];
                            if (product.id == image.product_id) {
                                product.images.push(image.image_path);
                            }
                        }
                    }

                    return res.json(productList);
                });
            }
        });
    },

    getPrivateProductList: function(req, res, next) {
        var userId = req.body.userId;

        var query = 'SELECT id, name, starting_price, current_price, discount_price, ';
        query += ' ratings_count, ratings_value, description, quantity, ';
        query += ' FROM_UNIXTIME(created_on) AS created_on FROM products ';
        query += ' WHERE publish = 0 ';
        query += ' AND created_by = ' + userId;
        query += ' ORDER BY id DESC ';

        connection.query(query, function(err, productList) {
            var arr = [];
            for (var i = 0; i < productList.length; i++) {
                productList[i].images = [];
                arr.push(productList[i].id);
            }

            query = 'SELECT product_id, image_path FROM product_images ';
            query += ' WHERE product_id IN (' + arr.join(',') + ') ';

            connection.query(query, function(err, imageList) {
                if (err) {
                    return res.json(productList);
                }

                for (var i = 0; i < productList.length; i++) {
                    var product = productList[i];
                    for (var j = 0; j < imageList.length; j++) {
                        var image = imageList[j];
                        if (product.id == image.product_id) {
                            product.images.push(image.image_path);
                        }
                    }
                }

                return res.json(productList);
            });
        });
    },

    getUnSoldProductList: function(req, res, next) {
        var userId = req.body.userId;

        var query = 'SELECT id, name, starting_price, current_price, discount_price, ';
        query += ' ratings_count, ratings_value, description, quantity, ';
        query += ' FROM_UNIXTIME(created_on) AS created_on FROM products ';
        query += ' WHERE 1 ';
        query += ' AND created_by = ' + userId;
        query += ' AND id NOT IN (SELECT product_id FROM orders WHERE (status = 7 OR status = 8))';
        query += ' ORDER BY id DESC ';

        connection.query(query, function(err, productList) {
            var arr = [];
            for (var i = 0; i < productList.length; i++) {
                productList[i].images = [];
                arr.push(productList[i].id);
            }

            query = 'SELECT product_id, image_path FROM product_images ';
            query += ' WHERE product_id IN (' + arr.join(',') + ') ';

            connection.query(query, function(err, imageList) {
                if (err) {
                    return res.json(productList);
                }

                for (var i = 0; i < productList.length; i++) {
                    var product = productList[i];
                    for (var j = 0; j < imageList.length; j++) {
                        var image = imageList[j];
                        if (product.id == image.product_id) {
                            product.images.push(image.image_path);
                        }
                    }
                }

                return res.json(productList);
            });
        });
    },

    updateOrderStatus: function(req, res, next) {
        var orderId = req.body.orderId;
        var status = req.body.status;

        var query = 'UPDATE orders SET status = ' + status + ' WHERE id = ' + orderId;
        connection.query(query, function(err, result) {
            if (err) {
                return res.json({ success: -1 });
            } else {
                return res.json({ success: 1 });
            }
        });
    },

    remainOrderFeedback: function(req, res, next) {
        var orderId = req.body.orderId;
        var userId = req.body.userId;
        var type = req.body.type;
        var rating = req.body.rating;
        var content = req.body.content;

        var query = 'INSERT INTO feedback(order_id, user_id, type, rating, content, created_at) ';
        query += ' VALUES(' + orderId + ', ' + userId + ', ' + type + ', ';
        query += ' ' + rating + ', "' + content + '", UNIX_TIMESTAMP()) ';

        connection.query(query, function(err, result) {
            if (err) {
                return res.json({ success: -1 });
            } else {
                var insertId = result.insertId;
                if (insertId > 0) {
                    var tmp = type == 1 ? 2 : 1;
                    query = 'SELECT * FROM feedback WHERE type = ' + tmp + ' AND order_id = ' + orderId;

                    connection.query(query, function(err, result) {
                        if (err || result.length == 0) {
                            return res.json({ success: 1, id: insertId });
                        }

                        var query = 'UPDATE orders SET status = 8 WHERE id = ' + orderId;
                        connection.query(query, function(err, result) {
                            if (err) {
                                return res.json({ success: -1 });
                            } else {
                                return res.json({ success: 1, id: insertId });
                            }
                        });

                    });
                } else {
                    return res.json({ success: -1 });
                }
            }
        });
    },
    getFeedback: function(req, res, next) {
        var userId = req.body.userId;
        var type = req.body.type;
        var query = 'SELECT A.content,A.rating,C.first_name,C.last_name,C.email,D.name,A.type AS FeedbackType FROM feedback A LEFT JOIN orders B ON B.user_id=' + userId +
            ' LEFT JOIN users C ON C.id=B.user_id LEFT JOIN products D ON D.id=B.product_id WHERE A.order_id=B.id'
        connection.query(query, function(err, result) {
            if (err) {
                return res.json({ success: -1 });
            } else {
                return res.json({ success: 1, data: result });
            }
        });
    },

    getBidList: function(req, res, next) {
        var query = `
            SELECT 
                FROM_UNIXTIME(pb.bid_time) bidTime, pb.bid_amount bidAmount
                , u.email buyerEmail
                , p.name productName
            FROM product_bids pb
            LEFT JOIN users u ON pb.buyer_id=u.id
            LEFT JOIN products p ON pb.product_id=p.id
            WHERE p.created_by=?
        `;
        console.log(req.body);
        connection.query(query, [req.body.userId], function(err, results) {
            if (err) {
                console.log(err);
                return res.json({ status: -1 });
            }
            return res.json(results);
        })
    }

}