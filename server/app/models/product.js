"use strict";

var mysql = require('mysql');
var connection;

module.exports = {

    setConnection: function(con) {
        connection = con;
    },

    addCompare: function(userId, productId, res) {
        if (!userId || typeof userId === 'undefined' || userId === null || userId === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!productId || typeof productId === 'undefined' || productId === null || productId === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        var data = {
            user_id: userId,
            product_id: productId,
            created_at: mysql.raw('UNIX_TIMESTAMP()')
        }

        connection.query('SELECT * FROM compares WHERE user_id = ? AND product_id = ?', [userId, productId], function(err, results) {
            if (err) {
                return res({ status: -1 });
            }
            if (results.length > 0) {
                return res({ status: -2 });
            } else {
                connection.query('INSERT INTO compares SET ?', data, function(err, results) {
                    if (err) {
                        return res({ status: -3, msg: err.stack });
                    }
                    return res({ status: 1 });
                })
            }
        })
    },

    addWishList: function(userId, productId, res) {
        if (!userId || typeof userId === 'undefined' || userId === null || userId === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!productId || typeof productId === 'undefined' || productId === null || productId === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        var data = {
            user_id: userId,
            product_id: productId,
            created_at: mysql.raw('UNIX_TIMESTAMP()')
        }

        connection.query('SELECT * FROM wishes WHERE user_id = ? AND product_id = ?', [userId, productId], function(err, results) {
            if (err) {
                return res({ status: -1 });
            }
            if (results.length > 0) {
                return res({ status: -2 });
            } else {
                connection.query('INSERT INTO wishes SET ?', data, function(err, results) {
                    if (err) {
                        return res({ status: -3, msg: err.stack });
                    }
                    return res({ status: 1 });
                })
            }
        })
    },

    addCart: function(userId, productId, quantity, price, res) {
        if (!userId || typeof userId === 'undefined' || userId === null || userId === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!productId || typeof productId === 'undefined' || productId === null || productId === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!quantity || typeof quantity === 'undefined' || quantity === null || quantity === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!price || typeof price === 'undefined' || price === null || price === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        var data = {
            user_id: userId,
            product_id: productId,
            quantity: quantity,
            price: price,
            created_at: mysql.raw('UNIX_TIMESTAMP()')
        }

        connection.query('SELECT * FROM carts WHERE user_id = ? AND product_id = ?', [userId, productId], function(err, results) {
            if (err) {
                return res({ status: -1 });
            }
            if (results.length > 0) {
                return res({ status: -2 });
            } else {
                connection.query('INSERT INTO carts SET ?', data, function(err, results) {
                    if (err) {
                        return res({ status: -3, msg: err.stack });
                    }
                    return res({ status: 1 });
                })
            }
        })
    },

    getCompareCount: function(userId, res) {
        if (!userId || typeof userId === 'undefined' || userId === null || userId === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        connection.query('SELECT * FROM compares WHERE user_id = ?', [userId], function(err, results) {
            if (err) {
                return res({ status: -1 });
            }
            return res({ status: 1, count: results.length });
        })
    },

    getWishListCount: function(userId, res) {
        if (!userId || typeof userId === 'undefined' || userId === null || userId === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        connection.query('SELECT * FROM wishes WHERE user_id = ?', [userId], function(err, results) {
            if (err) {
                return res({ status: -1 });
            }
            return res({ status: 1, count: results.length });
        })
    },

    getCartCount: function(userId, res) {
        if (!userId || typeof userId === 'undefined' || userId === null || userId === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        connection.query('SELECT * FROM carts WHERE user_id = ?', [userId], function(err, results) {
            if (err) {
                return res({ status: -1 });
            }
            return res({ status: 1, count: results.length });
        })
    },

    getWishList: function(userId, res) {
        var query = `
            SELECT A.*, B.name, D.image_path AS image, B.current_price, B.quantity, B.id AS product_id
            FROM wishes AS A
            LEFT JOIN products AS B ON A.product_id=B.id
            LEFT JOIN product_image_relations AS C ON A.product_id=C.product_id
            LEFT JOIN product_images AS D ON C.image_id=D.id
            WHERE A.user_id=?
            GROUP BY A.id
        `;
        connection.query(query, [userId], function(err, results) {
            if (err) {
                return res({ status: -1 });
            }
            return res({ status: 1, data: results });
        })
    },

    removeWish: function(id, res) {
        connection.query('DELETE FROM wishes WHERE id=?', id, function(err) {
            if (err) {
                return res({ status: -1 });
            }
            return res({ status: 1 });
        })
    },

    clearWish: function(userId, cb) {
        connection.query('DELETE FROM wishes WHERE user_id=?', userId, cb);
    },

    getCartList: function(userId, cb) {
        var query = `
            SELECT A.*, B.name, D.image_path AS image, B.current_price, B.id AS product_id
            FROM carts AS A
            LEFT JOIN products AS B ON A.product_id=B.id
            LEFT JOIN product_image_relations AS C ON A.product_id=C.product_id
            LEFT JOIN product_images AS D ON C.image_id=D.id
            WHERE A.user_id=?
            GROUP BY A.id
        `;
        connection.query(query, userId, cb);
    },

    removeCart: function(cartId, cb) {
        connection.query('DELETE FROM carts WHERE id=?', cartId, cb);
    },

    clearCart: function(userId, cb) {
        connection.query('DELETE FROM carts WHERE user_id=?', userId, cb);
    },

    getCompareList: function(userId, cb) {
        var query = `
            SELECT A.*, B.name, D.image_path AS image, B.current_price, B.quantity, B.ratings_count, B.ratings_value, B.description, B.colors, B.id AS product_id
            FROM compares AS A
            LEFT JOIN products AS B ON A.product_id=B.id
            LEFT JOIN product_image_relations AS C ON A.product_id=C.product_id
            LEFT JOIN product_images AS D ON C.image_id=D.id
            WHERE A.user_id=?
            GROUP BY A.id
        `;
        connection.query(query, userId, cb);
    },

    removeCompare: function(compareId, cb) {
        connection.query('DELETE FROM compares WHERE id=?', compareId, cb);
    },

    clearCompare: function(userId, cb) {
        connection.query('DELETE FROM compares WHERE user_id=?', userId, cb);
    },

    getProductInfoById: function(id, res) {
        if (!id || typeof id === 'undefined' || id === null || id === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        connection.query('SELECT * FROM products WHERE id = ?', [id], function(err, results) {
            if (err) {
                return res({ status: -1, product: null, msg: 'Database query error when selecting product' });
            }
            if (results.length === 0) {
                return res({ status: -2, product: null, msg: 'No product exists for the product id' });
            } else {
                return res({ status: 1, product: results[0], msg: 'Succeed to get product info' });
            }
        })
    },

    placeOrder: function(orderData, res) {
        if (!orderData.user_id || typeof orderData.user_id === 'undefined' || orderData.user_id === null || orderData.user_id === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!orderData.product_id || typeof orderData.product_id === 'undefined' || orderData.product_id === null || orderData.product_id === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!orderData.quantity || typeof orderData.quantity === 'undefined' || orderData.quantity === null || orderData.quantity === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!orderData.ordering_price || typeof orderData.ordering_price === 'undefined' || orderData.ordering_price === null || orderData.ordering_price === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!orderData.first_name || typeof orderData.first_name === 'undefined' || orderData.first_name === null || orderData.first_name === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!orderData.last_name || typeof orderData.last_name === 'undefined' || orderData.last_name === null || orderData.last_name === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!orderData.middle_name || typeof orderData.middle_name === 'undefined' || orderData.middle_name === null || orderData.middle_name === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!orderData.company || typeof orderData.company === 'undefined' || orderData.company === null || orderData.company === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!orderData.email || typeof orderData.email === 'undefined' || orderData.email === null || orderData.email === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!orderData.phone || typeof orderData.phone === 'undefined' || orderData.phone === null || orderData.phone === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!orderData.country || typeof orderData.country === 'undefined' || orderData.country === null || orderData.country === '' || orderData.country === 0) {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!orderData.city || typeof orderData.city === 'undefined' || orderData.city === null || orderData.city === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!orderData.province || typeof orderData.province === 'undefined' || orderData.province === null || orderData.province === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!orderData.zip_code || typeof orderData.zip_code === 'undefined' || orderData.zip_code === null || orderData.zip_code === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!orderData.address || typeof orderData.address === 'undefined' || orderData.address === null || orderData.address === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!orderData.delivery_method || typeof orderData.delivery_method === 'undefined' || orderData.delivery_method === null || orderData.delivery_method === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (!orderData.status || typeof orderData.status === 'undefined' || orderData.status === null || orderData.status === '' || orderData.status === 0) {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        var data = {
            user_id: orderData.user_id,
            product_id: orderData.product_id,
            quantity: orderData.quantity,
            ordering_price: orderData.ordering_price,
            first_name: orderData.first_name,
            last_name: orderData.last_name,
            middle_name: orderData.middle_name,
            company: orderData.company,
            email: orderData.email,
            phone: orderData.phone,
            country: orderData.country,
            city: orderData.city,
            province: orderData.province,
            zip_code: orderData.zip_code,
            address: orderData.address,
            delivery_method: orderData.delivery_method,
            ordered_at: mysql.raw('UNIX_TIMESTAMP()'),
            status: orderData.status,
            completed_at: null,
            feedback: ''
        }

        connection.query('INSERT INTO orders SET ?', data, function(err, results) {
            if (err) {
                return res({ status: -1, msg: err.stack });
            }
            return res({ status: 1 });
        })
    },

    getDiscountInfo: function(discountId, res) {
        if (!discountId || typeof discountId === 'undefined' || discountId === null || discountId === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        connection.query('SELECT * FROM product_discounts WHERE id = ?', [discountId], function(err, results) {
            if (err) {
                return res({ status: -1 });
            }
            if (results.length === 0) {
                return res({ status: -2, discount: null });
            } else {
                return res({ status: 1, discount: results[0] });
            }
        });
    },

    getDiscountProductInfo: function(discountId, res) {
        if (!discountId || typeof discountId === 'undefined' || discountId === null || discountId === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        var query = `
            SELECT A.*, B.name AS product_name, B.title AS product_title FROM product_discounts A
            LEFT JOIN products B ON A.product_id = B.id
            WHERE A.id = ?
        `;

        connection.query(query, [discountId], function(err, results) {
            if (err) {
                return res({ status: -1 });
            }
            if (results.length === 0) {
                return res({ status: -2, discount: null });
            } else {
                return res({ status: 1, discount: results[0] });
            }
        });
    },

    removeDiscount: function(discountId, res) {
        if (!discountId || typeof discountId === 'undefined' || discountId === null || discountId === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        connection.query('UPDATE product_discounts SET status = -1 WHERE id = ?', [discountId], function(err, results) {
            if (err) {
                return res({ status: -2, msg: err });
            }
            return res({ status: 1 });
        });
    },

    updateDiscount: function(discountId, res) {
        if (!discountId || typeof discountId === 'undefined' || discountId === null || discountId === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        connection.query('UPDATE product_discounts SET status = 1 WHERE id = ?', [discountId], function(err, results) {
            if (err) {
                return res({ status: -2, msg: err });
            }
            return res({ status: 1 });
        });
    },

    getRemainTime: function(productId, res) {
        if (!productId || typeof productId === 'undefined' || productId === null || productId === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        this.getProductInfoById(productId, function(res_1) {
            if (res_1.status === 1) {
                var productInfo = res_1.product;

                var now = new Date(); 
                var nowSec = parseInt(now.getTime() / 1000, 10);

                var durationSec = productInfo.duration * 24 * 60 * 60;
                var remainSec = durationSec - (nowSec - productInfo.created_on);
                if (remainSec < 0) {    // bid time exceeds ...
                    remainSec = 0;
                }

                var remainHour = parseInt(remainSec / 3600, 10);
                var remainMin = parseInt((remainSec - remainHour * 3600) / 60, 10);
                var remainSec = remainSec - remainHour * 3600 - remainMin * 60;

                return res({ status: 1, hour: remainHour, min: remainMin, sec: remainSec });
            } else {
                return res({ status: res_1.status, hour: 0, min: 0, sec: 0 });
            }
        });
    },

    getOrderListForSeller: function(sellerId, type, res) {
        if (!sellerId || typeof sellerId === 'undefined' || sellerId === null || sellerId === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (typeof type === 'undefined' || type === null || type === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        var query = `
            SELECT A.id, A.product_id AS productId, C.created_by AS sellerId, A.ordering_price AS orderingPrice, A.quantity,
                FROM_UNIXTIME(A.ordered_at) AS orderedAt, A.status,
                B.email AS ordererEmail, C.name AS productName, C.current_price AS productPrice,
                IFNULL(D.id, 0) AS sellerFeedbackId, IFNULL(D.rating, 0) AS sellerRating, IFNULL(D.content, \'\') AS sellerFeedback,
                IFNULL(E.id, 0) AS buyerFeedbackId, IFNULL(E.rating, 0) AS buyerRating, IFNULL(E.content, \'\') AS buyerFeedback
            FROM orders A INNER JOIN users B ON A.user_id = B.id
            INNER JOIN products C ON A.product_id = C.id
            LEFT JOIN (SELECT * FROM feedback WHERE type = 1) D ON A.id = D.order_id
            LEFT JOIN (SELECT * FROM feedback WHERE type = 2) E ON A.id = E.order_id
            WHERE C.created_by = ?`;

        if (type == 1) {
            query += ' AND A.status = 3';
        } else if (type == 2) {
            query += ' AND (A.status = 5 OR A.status = 6)';
        } else if (type == 3) {
            query += ' AND (A.status = 7 OR A.status = 8)';
        } else if (type == 4) {
            query += ' AND A.status = 2';
        }
        query += ' ORDER BY A.id DESC';

        connection.query(query, [sellerId], function(err, results) {
            if (err) {
                return res({ status: -1 });
            }
            if (results.length === 0) {
                return res({ status: -2, orders: null });
            } else {
                return res({ status: 1, orders: results });
            }
        });
    },

    getOrderListForBuyer: function(buyerId, type, res) {
        if (!buyerId || typeof buyerId === 'undefined' || buyerId === null || buyerId === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        if (typeof type === 'undefined' || type === null || type === '') {
            return res({ status: 0, msg: 'invalid parameters' });
        }

        var query = `
            SELECT A.id, A.product_id AS productId, C.created_by AS sellerId, A.ordering_price AS orderingPrice, A.quantity,
                FROM_UNIXTIME(A.ordered_at) AS orderedAt, A.status,
                B.email AS ordererEmail, C.name AS productName, C.current_price AS productPrice,
                IFNULL(D.id, 0) AS sellerFeedbackId, IFNULL(D.rating, 0) AS sellerRating, IFNULL(D.content, \'\') AS sellerFeedback,
                IFNULL(E.id, 0) AS buyerFeedbackId, IFNULL(E.rating, 0) AS buyerRating, IFNULL(E.content, \'\') AS buyerFeedback
            FROM orders A INNER JOIN users B ON A.user_id = B.id
            INNER JOIN products C ON A.product_id = C.id
            LEFT JOIN (SELECT * FROM feedback WHERE type = 1) D ON A.id = D.order_id
            LEFT JOIN (SELECT * FROM feedback WHERE type = 2) E ON A.id = E.order_id
            WHERE A.user_id = ?`;

        if (type == 1) {
            query += ' AND A.status = 3 ';
        } else if (type == 2) {
            query += ' AND (A.status = 5 OR A.status = 6)';
        } else if (type == 3) {
            query += ' AND (A.status = 7 OR A.status = 8) ';
        } else if (type == 4) {
            query += ' AND A.status = 2 ';
        }
        query += ' ORDER BY A.id DESC ';

        connection.query(query, [buyerId], function(err, results) {
            if (err) {
                return res({ status: -1 });
            }
            if (results.length === 0) {
                return res({ status: -2, orders: null });
            } else {
                return res({ status: 1, orders: results });
            }
        });
    }

}
