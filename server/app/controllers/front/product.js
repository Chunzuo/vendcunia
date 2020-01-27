'use strict';

var models = require('../../models');
var mysql = require('mysql');
var multer = require('multer');
var product = require('../../models/product');
var user = require('../../models/user');
var settings = require('../../../config/settings');

var connection;

const uploadFolder = './uploads/products';
const fs = require('fs');

module.exports = {

    setConnection: function(con) {
        connection = con;
        product.setConnection(con);
        user.setConnection(con);
    },

    list: function(req, res, next) {
        var category_id = req.body.category_id,
            search_keyword = req.body.search_keyword,
            page = req.body.page,
            count_per_page = req.body.limit,
            order_by = req.body.order_by,
            order_direction = req.body.order_direction,
            featured = req.body.featured;

        var params = [];
        /*var query = `
            SELECT A.id, A.name, A.title, A.sub_title, A.description, A.condition_desc, A.selling_format, A.duration, A.discount_price, A.ratings_count, 
                A.ratings_value, A.starting_price, A.current_price, A.reserve_price, A.quantity, A.sales_tax, A.created_on, A.created_by, 
                C.id AS category_id, C.name AS category_name, D.image_path AS thumnail_image,
                CASE WHEN M.from < UNIX_TIMESTAMP() AND M.to > UNIX_TIMESTAMP() THEN M.offer_name ELSE '' END AS volume_pricing_name,
                CASE WHEN A.duration * 24 * 3600 > UNIX_TIMESTAMP() - A.created_on THEN SEC_TO_TIME(A.duration * 24 * 3600 - UNIX_TIMESTAMP() + A.created_on) ELSE 0 END AS remain_second, 
                GROUP_CONCAT(IFNULL(K.message, '')) AS promotion_name,
                IF(O.economy_check = 1, CONCAT(IF(O.economy_price > 0, "Upgrade to Economy Shipping for ", "Free Economy Shipping on orders over "), IF(O.min_price > 0, CONCAT("AFCASH", O.min_price), CONCAT(O.min_amount, "Items"))), "") economy_msg,
                IF(O.standard_check = 1, CONCAT(IF(O.standard_price > 0, "Upgrade to Standard Shipping for ", "Free Standard Shipping on orders over "), IF(O.min_price > 0, CONCAT("AFCASH", O.min_price), CONCAT(O.min_amount, "Items"))), "") standard_msg,
                IF(O.expected_check = 1, CONCAT(IF(O.expected_price > 0, "Upgrade to Expected Shipping for ", "Free Expected Shipping on orders over "), IF(O.min_price > 0, CONCAT("AFCASH", O.min_price), CONCAT(O.min_amount, "Items"))), "") expected_msg,
                IF(O.twoday_check = 1, CONCAT(IF(O.twoday_price > 0, "Upgrade to TwoDay Shipping for ", "Free TwoDay Shipping on orders over "), IF(O.min_price > 0, CONCAT("AFCASH", O.min_price), CONCAT(O.min_amount, "Items"))), "") twoday_msg,
                IF(O.overnight_check = 1, CONCAT(IF(O.overnight_price > 0, "Upgrade to Overnight Shipping for ", "Free Overnight Shipping on orders over "), IF(O.min_price > 0, CONCAT("AFCASH", O.min_price), CONCAT(O.min_amount, "Items"))), "") overnight_msg,
                IF(O.promotional_check = 1, CONCAT(IF(O.promotional_price > 0, "Upgrade to Promotional Shipping for ", "Free Promotional Shipping on orders over "), IF(O.min_price > 0, CONCAT("AFCASH", O.min_price), CONCAT(O.min_amount, "Items"))), "") promotional_msg,
                CASE WHEN Q.start_date < UNIX_TIMESTAMP() AND Q.end_date > UNIX_TIMESTAMP() THEN Q.message ELSE '' END AS saleEvent_name
            FROM products AS A
            LEFT JOIN product_cate_relations AS B ON A.id = B.product_id
            LEFT JOIN categories AS C ON C.id = B.category_id
            LEFT JOIN product_images AS D ON D.product_id = A.id
            LEFT JOIN special_products AS F ON F.product_id = A.id
            LEFT JOIN product_order_discount_relations I ON I.product_id = A.id
            LEFT JOIN (SELECT GROUP_CONCAT(id) AS ids, type FROM order_discounts WHERE start_date < UNIX_TIMESTAMP() AND end_date > UNIX_TIMESTAMP() GROUP BY type) AS G ON I.order_discount_id IN (G.ids)
            LEFT JOIN order_discount_types K ON G.type = K.id
            LEFT JOIN volume_pricing_product_rels L ON L.product_id = A.id
            LEFT JOIN volume_pricings M ON M.id = L.volume_pricing_id
            LEFT JOIN product_shipping_discount_relations N ON A.id=N.product_id
            LEFT JOIN shipping_discounts O ON N.shipping_discount_id = O.id
            LEFT JOIN product_sale_event_relations P ON p.product_id = A.id
            LEFT JOIN sale_events Q ON Q.id=p.sale_event_id
            WHERE A.publish = 1
        `;*/

        var query = `
            SELECT A.id, A.name, A.title, A.sub_title, A.description, A.condition_desc, A.selling_format, A.duration, A.discount_price, A.ratings_count, 
                A.ratings_value, A.starting_price, A.current_price, A.reserve_price, A.quantity, A.sales_tax, A.created_on, A.created_by, 
                A.category_id, A.category_name, A.thumnail_image,
                B.promotion_name, C.economy_msg, C.standard_msg, C.twoday_msg, C.overnight_msg, C.promotional_msg,
                CASE WHEN A.duration * 24 * 3600 > UNIX_TIMESTAMP() - A.created_on THEN SEC_TO_TIME(A.duration * 24 * 3600 - UNIX_TIMESTAMP() + A.created_on) ELSE 0 END AS remain_second,
                CASE WHEN M.from < UNIX_TIMESTAMP() AND M.to > UNIX_TIMESTAMP() THEN M.offer_name ELSE '' END AS volume_pricing_name,
                CASE WHEN Q.start_date < UNIX_TIMESTAMP() AND Q.end_date > UNIX_TIMESTAMP() THEN Q.message ELSE '' END AS saleEvent_name
            FROM 
                        (
                            SELECT A.*, C.id AS category_id, C.name AS category_name, E.image_path AS thumnail_image, E.images,
                            H.first_name AS seller_name, H.email AS seller_emailexpected_msg
                            FROM products A
                            LEFT JOIN product_cate_relations AS B ON A.id = B.product_id
                            LEFT JOIN categories AS C ON C.id = B.category_id
                            LEFT JOIN (select product_id, image_path, GROUP_CONCAT(image_path) AS images from product_images group by product_id) AS E ON E.product_id = A.id
                            LEFT JOIN users AS H ON H.id = A.created_by
                        ) AS A
            LEFT JOIN 
                        (
                            SELECT F.product_id, GROUP_CONCAT(IFNULL(K.message, '')) AS promotion_name FROM product_order_discount_relations AS F
                            LEFT JOIN (SELECT GROUP_CONCAT(id) AS ids, type FROM order_discounts 
                            WHERE start_date < UNIX_TIMESTAMP() AND end_date > UNIX_TIMESTAMP() GROUP BY type) AS G ON F.order_discount_id IN (G.ids)
                            LEFT JOIN order_discount_types K ON G.type = K.id
                            GROUP BY F.product_id
                        ) AS B ON A.id = B.product_id
            LEFT JOIN volume_pricing_product_rels L ON L.product_id = A.id
            LEFT JOIN volume_pricings M ON M.id = L.volume_pricing_id
                        LEFT JOIN (
                            SELECT A.product_id, GROUP_CONCAT(A.economy_msg) AS economy_msg, GROUP_CONCAT(A.expected_msg) AS expected_msg, 
                            GROUP_CONCAT(A.overnight_msg) AS overnight_msg, GROUP_CONCAT(A.promotional_msg) AS promotional_msg, 
                            GROUP_CONCAT(A.standard_msg) AS standard_msg, GROUP_CONCAT(A.twoday_msg) AS twoday_msg FROM (
                                SELECT N.product_id,  
                                                            IF(O.economy_check = 1, CONCAT(IF(O.economy_price > 0, "Upgrade to Economy Shipping for ", "Free Economy Shipping on orders over "), IF(O.min_price > 0, CONCAT("AFCASH", O.min_price), CONCAT(O.min_amount, "Items"))), "") economy_msg,
                                                            IF(O.standard_check = 1, CONCAT(IF(O.standard_price > 0, "Upgrade to Standard Shipping for ", "Free Standard Shipping on orders over "), IF(O.min_price > 0, CONCAT("AFCASH", O.min_price), CONCAT(O.min_amount, "Items"))), "") standard_msg,
                                                            IF(O.expected_check = 1, CONCAT(IF(O.expected_price > 0, "Upgrade to Expected Shipping for ", "Free Expected Shipping on orders over "), IF(O.min_price > 0, CONCAT("AFCASH", O.min_price), CONCAT(O.min_amount, "Items"))), "") expected_msg,
                                                            IF(O.twoday_check = 1, CONCAT(IF(O.twoday_price > 0, "Upgrade to TwoDay Shipping for ", "Free TwoDay Shipping on orders over "), IF(O.min_price > 0, CONCAT("AFCASH", O.min_price), CONCAT(O.min_amount, "Items"))), "") twoday_msg,
                                                            IF(O.overnight_check = 1, CONCAT(IF(O.overnight_price > 0, "Upgrade to Overnight Shipping for ", "Free Overnight Shipping on orders over "), IF(O.min_price > 0, CONCAT("AFCASH", O.min_price), CONCAT(O.min_amount, "Items"))), "") overnight_msg,
                                                            IF(O.promotional_check = 1, CONCAT(IF(O.promotional_price > 0, "Upgrade to Promotional Shipping for ", "Free Promotional Shipping on orders over "), IF(O.min_price > 0, CONCAT("AFCASH", O.min_price), CONCAT(O.min_amount, "Items"))), "") promotional_msg
                                                        FROM product_shipping_discount_relations N 
                                                        LEFT JOIN shipping_discounts O ON N.shipping_discount_id = O.id
                            ) A
                            GROUP BY A.product_id
                        ) AS C ON A.id = C.product_id
            LEFT JOIN product_sale_event_relations P ON p.product_id = A.id
            LEFT JOIN sale_events Q ON Q.id=p.sale_event_id
            WHERE A.publish = 1
        `;

        if (category_id != null) {
            query += ' AND category_id=?';
            params.push(category_id);
        }
        query += ' GROUP BY A.id';
        if (count_per_page != null) {
            query += ' LIMIT ?';
            params.push(count_per_page);
        }

        connection.query(query, params, function(err, results) {
            if (err) {
                return res.json({ status: -1, msg: err });
            }
            return res.json(results);
        })
    },

    load: function(req, res, next) {
        var query = `
            SELECT A.*, B.promotion_name, C.economy_msg, C.standard_msg, C.twoday_msg, C.overnight_msg, C.promotional_msg,
                CASE WHEN A.duration * 24 * 3600 > UNIX_TIMESTAMP() - A.created_on THEN SEC_TO_TIME(A.duration * 24 * 3600 - UNIX_TIMESTAMP() + A.created_on) ELSE 0 END AS remain_second,
                CASE WHEN M.from < UNIX_TIMESTAMP() AND M.to > UNIX_TIMESTAMP() THEN M.offer_name ELSE '' END AS volume_pricing_name,
                CASE WHEN Q.start_date < UNIX_TIMESTAMP() AND Q.end_date > UNIX_TIMESTAMP() THEN Q.message ELSE '' END AS saleEvent_name
            FROM 
                        (
                            SELECT A.*, C.id AS category_id, C.name AS category_name, E.image_path AS thumnail_image, E.images,
                            H.first_name AS seller_name, H.email AS seller_emailexpected_msg
                            FROM products A
                            LEFT JOIN product_cate_relations AS B ON A.id = B.product_id
                            LEFT JOIN categories AS C ON C.id = B.category_id
                            LEFT JOIN (select product_id, image_path, GROUP_CONCAT(image_path) AS images from product_images group by product_id) AS E ON E.product_id = A.id
                            LEFT JOIN users AS H ON H.id = A.created_by
                        ) AS A
            LEFT JOIN 
                        (
                            SELECT F.product_id, GROUP_CONCAT(IFNULL(K.message, '')) AS promotion_name FROM product_order_discount_relations AS F
                            LEFT JOIN (SELECT GROUP_CONCAT(id) AS ids, type FROM order_discounts 
                            WHERE start_date < UNIX_TIMESTAMP() AND end_date > UNIX_TIMESTAMP() GROUP BY type) AS G ON F.order_discount_id IN (G.ids)
                            LEFT JOIN order_discount_types K ON G.type = K.id
                            GROUP BY F.product_id
                        ) AS B ON A.id = B.product_id
            LEFT JOIN volume_pricing_product_rels L ON L.product_id = A.id
            LEFT JOIN volume_pricings M ON M.id = L.volume_pricing_id
                        LEFT JOIN (
                            SELECT A.product_id, GROUP_CONCAT(A.economy_msg) AS economy_msg, GROUP_CONCAT(A.expected_msg) AS expected_msg, 
                            GROUP_CONCAT(A.overnight_msg) AS overnight_msg, GROUP_CONCAT(A.promotional_msg) AS promotional_msg, 
                            GROUP_CONCAT(A.standard_msg) AS standard_msg, GROUP_CONCAT(A.twoday_msg) AS twoday_msg FROM (
                                SELECT N.product_id,  
                                                            IF(O.economy_check = 1, CONCAT(IF(O.economy_price > 0, "Upgrade to Economy Shipping for ", "Free Economy Shipping on orders over "), IF(O.min_price > 0, CONCAT("AFCASH", O.min_price), CONCAT(O.min_amount, "Items"))), "") economy_msg,
                                                            IF(O.standard_check = 1, CONCAT(IF(O.standard_price > 0, "Upgrade to Standard Shipping for ", "Free Standard Shipping on orders over "), IF(O.min_price > 0, CONCAT("AFCASH", O.min_price), CONCAT(O.min_amount, "Items"))), "") standard_msg,
                                                            IF(O.expected_check = 1, CONCAT(IF(O.expected_price > 0, "Upgrade to Expected Shipping for ", "Free Expected Shipping on orders over "), IF(O.min_price > 0, CONCAT("AFCASH", O.min_price), CONCAT(O.min_amount, "Items"))), "") expected_msg,
                                                            IF(O.twoday_check = 1, CONCAT(IF(O.twoday_price > 0, "Upgrade to TwoDay Shipping for ", "Free TwoDay Shipping on orders over "), IF(O.min_price > 0, CONCAT("AFCASH", O.min_price), CONCAT(O.min_amount, "Items"))), "") twoday_msg,
                                                            IF(O.overnight_check = 1, CONCAT(IF(O.overnight_price > 0, "Upgrade to Overnight Shipping for ", "Free Overnight Shipping on orders over "), IF(O.min_price > 0, CONCAT("AFCASH", O.min_price), CONCAT(O.min_amount, "Items"))), "") overnight_msg,
                                                            IF(O.promotional_check = 1, CONCAT(IF(O.promotional_price > 0, "Upgrade to Promotional Shipping for ", "Free Promotional Shipping on orders over "), IF(O.min_price > 0, CONCAT("AFCASH", O.min_price), CONCAT(O.min_amount, "Items"))), "") promotional_msg
                                                        FROM product_shipping_discount_relations N 
                                                        LEFT JOIN shipping_discounts O ON N.shipping_discount_id = O.id
                            ) A
                            GROUP BY A.product_id
                        ) AS C ON A.id = C.product_id
            LEFT JOIN product_sale_event_relations P ON p.product_id = A.id
            LEFT JOIN sale_events Q ON Q.id=p.sale_event_id
            WHERE A.id = ?
        `;
        connection.query(query, [req.body.id], function(err, results) {
            if (err) {
                return res.json({ status: -1, msg: err });
            }

            if (results.length === 0) {
                return res.json({ status: -2, productInfo: null });
            } else {
                return res.json({ status: 1, productInfo: results[0] });
            }
        })
    },

    uploadFile: function(req, res) {
        var file_path = settings.server_url + req.file.path.replace("uploads", "").replace('\\', "/").replace('\\', "/");
        res.send(file_path);
    },

    listUrlFiles: function(req, res) {
        fs.readdir(uploadFolder, (err, files) => {
            for (let i = 0; i < files.length; ++i) {
                files[i] = settings.server_url + "/products" + files[i];
            }
            res.send(files);
        })
    },

    downloadFile: function(req, res) {
        let filename = req.params.filename;
        res.download(uploadFolder + filename);
    },

    create: function(req, res, next) {
        var brands = '';
        if (req.body.brands) {
            req.body.brands.forEach((brand, idx) => {
                brands += brand;
                if (idx != req.body.brands.length - 1)
                    brands += ',';
            });
        }

        var product = {
            name: req.body.name,
            title: req.body.title,
            sub_title: req.body.sub_title,
            condition_desc: req.body.condition_desc,
            description: req.body.description,
            selling_format: req.body.selling_format,
            duration: req.body.duration,
            starting_price: req.body.start_price,
            current_price: req.body.now_price,
            reserve_price: req.body.reserve_price,
            quantity: req.body.quantity,
            sales_tax: req.body.sales_tax,
            created_by: req.body.user_id,
            condition_id: req.body.condition,
            orig_quantity: req.body.quantity,
            short_description: '',
            additional_info: '',
            ratings_count: 0,
            ratings_value: 0,
            created_on: mysql.raw('UNIX_TIMESTAMP()'),
            package_type: req.body.pktype,
            package_dimens_x: req.body.dimention_x,
            package_dimens_y: req.body.dimention_y,
            package_dimens_z: req.body.dimention_z,
            weight_type: req.body.weight,
            weight_lbs: req.body.lbs,
            weight_oz: req.body.oz,
            brands: brands,
            material: req.body.material,
            provenance: req.body.provenance
        }
        var upload_files = req.body.files;
        var colors = req.body.colors;
        var shippingObj = {
            domestic_type: req.body.shipping,
            domestic_service: req.body.service,
            domestic_handling_time: req.body.businessDay,
            internal_shipping_type: req.body.intern_shipping,
            shipping_to_type: req.body.ship_to,
            international_service: req.body.international_service,
            domestic_cost: req.body.domestic_cost,
            additional_location: req.body.additional_location,
            international_cost: req.body.international_shipping_cost,
            free: req.body.free,
            offer_local_pickup: req.body.offerLocalPickup,
            offical_cost: req.body.offical_cost
        };
        connection.query('INSERT INTO shippings SET ?', shippingObj, function(err, newShipping) {
            if (!err) {
                product['shipping_id'] = newShipping.insertId;
                connection.query('INSERT INTO products SET ?', product, function(err, results) {
                    if (err) {
                        return res.json({ status: -1, msg: err });
                    }
                    var createdProductId = results.insertId;

                    for (var i = 0; i < upload_files.length; i++) {
                        connection.query('INSERT INTO product_images SET ? ', { image_path: upload_files[i], product_id: createdProductId }, function(err, results) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }

                    connection.query('INSERT INTO product_cate_relations SET ?', { product_id: createdProductId, category_id: req.body.category }, function(err, results) {
                        if (err) {
                            console.log(err);
                        }
                    })

                    connection.query('INSERT INTO special_products SET ?', { product_id: createdProductId, special_id: 1, registered_on: mysql.raw('UNIX_TIMESTAMP()') }, function(err, results) {
                        if (err) {
                            console.log(err);
                        }
                    })

                    if (colors) {
                        colors.forEach(color => {
                            connection.query('INSERT INTO product_color_relations SET ?', { color_id: color, product_id: createdProductId }, function(err) {
                                if (err) {
                                    console.log(err);
                                }
                            })
                        });
                    }
                    return res.json({ status: 1, msg: 'success' });
                });
            }
        });
    },

    bid: function(req, res, next) {
        connection.query('UPDATE products SET current_price=? WHERE id=?', [req.body.price, req.body.id], function(err, results) {
            if (err) {
                return res.json({ status: -1, msg: err });
            }
            var bidObj = {
                buyer_id: req.body.buyerId,
                product_id: req.body.id,
                bid_time: mysql.raw("UNIX_TIMESTAMP()"),
                bid_amount: req.body.price
            }
            connection.query('INSERT INTO product_bids SET ?', bidObj, function(err, results) {
                if (err) {
                    return res.json({ status: -1, msg: err });
                }
                return res.json({ status: 1, msg: 'success' });
            })
        })
    },

    discount: function(req, res, next) {
        connection.query('SELECT COUNT(*) as count FROM product_discounts WHERE buyer_id = ?', [req.body.buyer_id], function(err, results) {
            if (err) {
                return res.json({ status: -1, msg: err.stack });
            }
            if (results[0].count > 2) {
                return res.json({ status: -2 });
            }
            connection.query('INSERT INTO product_discounts SET ?', req.body, function(err, results) {
                if (err) {
                    return res.json({ status: -1, msg: err.stack });
                }
                return res.json({ status: 1, discountId: results.insertId });
            })
        })
    },

    review: function(req, res, next) {
        var obj = req.body;
        obj['created_on'] = mysql.raw('UNIX_TIMESTAMP()');
        connection.query('INSERT INTO product_reviews SET ?', obj, function(err, results) {
            if (err) {
                return res.json({ status: -1 });
            }
            return res.json({ status: 1 });
        })
    },

    reviewList: function(req, res, next) {
        connection.query('SELECT *, FROM_UNIXTIME(created_on) AS format_time FROM product_reviews WHERE product_id=?', [req.body.product_id], function(err, results) {
            if (err) {
                return res.json({ status: -1 });
            }
            return res.json({ status: 1, data: results });
        })
    },

    categorylist: function(req, res, next) {
        var query = '';
        var params = [];
        if (req.body.parent_id == -1) {
            query = 'SELECT * FROM categories';
        } else {
            query = 'SELECT * FROM categories WHERE parent_id = ?';
            params.push(req.body.parent_id);
        }
        connection.query(query, params, function(err, results) {
            if (err) {
                return res.json({ status: -1 });
            }
            return res.json(results);
        })
    },

    getBidder: function(req, res, next) {
        var query = 'SELECT * FROM product_bids WHERE product_id = ? ORDER BY bid_time DESC LIMIT 1';
        connection.query(query, [req.body.id], function(err, results) {
            if (err) {
                return res.json({ status: -1 });
            }
            if (results.length > 0) {
                return res.json({ status: 1, data: results[0] });
            } else {
                return res.json({ status: 1, data: null });
            }
        })
    },

    getRecentlyViewedProduct: function(req, res, next) {
        var query = 'SELECT B.* FROM product_visits AS A LEFT JOIN products AS B ON  A.product_id=B.id WHERE (3*24*3600>UNIX_TIMESTAMP()-visit_time) < 3 AND user_id=12 GROUP BY product_id';
        connection.query(query, [req.body.id], function(err, results) {
            if (err) {
                return res.json({ status: -1 });
            }
            return res.json({ status: 1, data: results });
        })
    },

    getProductsByCategory: function(req, res, next) {
        var query = `
            SELECT A.id, A.name, A.title, A.sub_title, A.description, A.condition_desc, A.selling_format, A.duration, A.discount_price, A.ratings_count, 
                A.ratings_value, A.starting_price, A.current_price, A.reserve_price, A.quantity, A.sales_tax, A.created_on, A.created_by, 
                C.id AS category_id, C.name AS category_name, E.image_path AS thumnail_image, 
                CASE WHEN A.duration * 24 * 3600 > UNIX_TIMESTAMP() - A.created_on THEN SEC_TO_TIME(A.duration * 24 * 3600 - UNIX_TIMESTAMP() + A.created_on) 
                ELSE 0 END AS remain_second
            FROM products AS A
            LEFT JOIN product_cate_relations AS B ON A.id=B.product_id
            LEFT JOIN categories AS C ON C.id=B.category_id
            LEFT JOIN product_images AS E ON E.product_id=A.id
            LEFT JOIN special_products AS F ON F.product_id=A.id
            WHERE B.category_id=?
            GROUP BY id
        `;
        connection.query(query, [req.body.category_id], function(err, results) {
            if (err) {
                return res.json({ status: -1, msg: err.stack });
            }
            return res.json(results);
        })
    },

    addOrderDiscount: function(req, res, next) {
        var obj = {
            name: req.body.name,
            type: 1,
            startDate: mysql.raw('UNIX_TIMESTAMP()'),
            endDate: mysql.raw('UNIX_TIMESTAMP()'),
            description: req.body.description
        }
        var product_ids = req.body.product_ids.split(',');
        connection.query('INSERT INTO order_discounts SET ?', obj, function(err, results) {
            if (err) {
                return res.json({ status: -1, msg: err.stack });
            }
            var orderDiscountId = results.insertId;
            product_ids.forEach((id) => {
                connection.query('INSERT INTO product_order_discount_relations SET ?', { product_id: id, order_discount_id: orderDiscountId }, function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
            })
            return res.json({ status: 1 });
        })
    },

    getDrafts: function(req, res, next) {
        var query = `
            SELECT A.id, A.title, C.image_path AS thumnail_image, E.title AS category
            FROM products AS A
            LEFT JOIN product_images AS C ON C.product_id=A.id
            LEFT JOIN product_cate_relations AS D ON A.id=D.product_id
            LEFT JOIN categories AS E ON E.id=D.category_id
            WHERE A.created_by = ? AND A.publish=0
            GROUP BY A.id
            ORDER BY A.created_on DESC
            LIMIT 5
        `;
        connection.query(query, [req.body.userId], function(err, results) {
            if (err) {
                return res.json({ status: -1 });
            }
            return res.json(results);
        });
    },

    getTemplateDetail: function(req, res, next) {
        var query = `
            SELECT A.name, A.title, A.sub_title, A.description, A.condition_desc, A.material, A.provenance, A.selling_format, A.duration, A.sales_tax, A.starting_price start_price, A.current_price now_price, A.package_type pktype, A.weight_type weight, A.package_dimens_x dimention_x, A.package_dimens_y dimention_y, A.package_dimens_z dimention_z, A.weight_lbs lbs, A.weight_oz oz, A.condition_id 'condition', A.reserve_price, A.quantity, A.brands
                , B.category_id as category
                , C.domestic_cost domestic_shipping_cost, C.international_cost international_shipping_cost, C.offical_cost, C.additional_location, C.domestic_type shipping, C.domestic_handling_time businessDay, C.domestic_service service, C.internal_shipping_type intern_shipping, C.free freeShipping, C.offer_local_pickup domestic_offer_local_pickup, C.shipping_to_type ship_to, C.id shipping_id

                , GROUP_CONCAT(E.id) colors
            FROM products AS A
            LEFT JOIN product_cate_relations AS B ON A.id=B.product_id
            LEFT JOIN shippings C ON A.shipping_id = C.id
            LEFT JOIN product_color_relations D ON A.id = D.product_id
            LEFT JOIN colors E ON E.id = D.color_id
            WHERE A.id = ?
        `;
        connection.query(query, [req.body.id], function(err, results) {
            if (err) {
                return res.json({ status: -1 });
            }
            return res.json(results);
        })
    },

    delete: function(req, res, next) {
        connection.query('DELETE FROM products WHERE id=?', [req.params.id], function(err, results) {
            if (err) {
                return res.json({ status: -1 });
            }
            return res.json(results);
        })
    },

    addCompare: function(req, res, next) {
        if (!req.body.user_id || typeof req.body.user_id === 'undefined' || req.body.user_id === null || req.body.user_id === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.product_id || typeof req.body.product_id === 'undefined' || req.body.product_id === null || req.body.product_id === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        var data = {
            user_id: req.body.user_id,
            product_id: req.body.product_id,
            created_at: mysql.raw('UNIX_TIMESTAMP()')
        }

        connection.query('SELECT * FROM compares WHERE user_id = ? AND product_id = ?', [req.body.user_id, req.body.product_id], function(err, results) {
            if (err) {
                return res.json({ status: -1 });
            }
            if (results.length > 0) {
                return res.json({ status: -2 });
            } else {
                connection.query('INSERT INTO compares SET ?', data, function(err, results) {
                    if (err) {
                        return res.json({ status: -3, msg: err.stack });
                    }
                    return res.json({ status: 1 });
                })
            }
        })
    },

    addWishList: function(req, res, next) {
        product.addWishList(req.body.user_id, req.body.product_id, function(res_1) {
            return res.json(res_1);
        });
    },

    addCart: function(req, res, next) {
        if (!req.body.user_id || typeof req.body.user_id === 'undefined' || req.body.user_id === null || req.body.user_id === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.product_id || typeof req.body.product_id === 'undefined' || req.body.product_id === null || req.body.product_id === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.quantity || typeof req.body.quantity === 'undefined' || req.body.quantity === null || req.body.quantity === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.price || typeof req.body.price === 'undefined' || req.body.price === null || req.body.price === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        var data = {
            user_id: req.body.user_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            price: req.body.price,
            created_at: mysql.raw('UNIX_TIMESTAMP()')
        }

        connection.query('SELECT * FROM carts WHERE user_id = ? AND product_id = ?', [req.body.user_id, req.body.product_id], function(err, results) {
            if (err) {
                return res.json({ status: -1 });
            }
            if (results.length > 0) {
                return res.json({ status: -2 });
            } else {
                connection.query('INSERT INTO carts SET ?', data, function(err, results) {
                    if (err) {
                        return res.json({ status: -3, msg: err.stack });
                    }
                    return res.json({ status: 1 });
                })
            }
        })
    },

    getFeedback: function(req, res, next) {
        var query = 'SELECT B.email,A.* FROM product_reviews A LEFT JOIN users B ON B.id=7 WHERE B.email = A.email';
        connection.query(query, [req.body.id], function(err, results) {
            if (err) {
                return res.json({ status: -1 });
            } else {
                return res.json({ status: 1, data: results });
            }
        });
    },

    placeOrder: function(req, res, next) {
        if (!req.body.user_id || typeof req.body.user_id === 'undefined' || req.body.user_id === null || req.body.user_id === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.product_id || typeof req.body.product_id === 'undefined' || req.body.product_id === null || req.body.product_id === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.quantity || typeof req.body.quantity === 'undefined' || req.body.quantity === null || req.body.quantity === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.ordering_price || typeof req.body.ordering_price === 'undefined' || req.body.ordering_price === null || req.body.ordering_price === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.first_name || typeof req.body.first_name === 'undefined' || req.body.first_name === null || req.body.first_name === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.last_name || typeof req.body.last_name === 'undefined' || req.body.last_name === null || req.body.last_name === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.middle_name || typeof req.body.middle_name === 'undefined' || req.body.middle_name === null || req.body.middle_name === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.company || typeof req.body.company === 'undefined' || req.body.company === null || req.body.company === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.email || typeof req.body.email === 'undefined' || req.body.email === null || req.body.email === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.phone || typeof req.body.phone === 'undefined' || req.body.phone === null || req.body.phone === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.country || typeof req.body.country === 'undefined' || req.body.country === null || req.body.country === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.city || typeof req.body.city === 'undefined' || req.body.city === null || req.body.city === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.province || typeof req.body.province === 'undefined' || req.body.province === null || req.body.province === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.zip_code || typeof req.body.zip_code === 'undefined' || req.body.zip_code === null || req.body.zip_code === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.address || typeof req.body.address === 'undefined' || req.body.address === null || req.body.address === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.delivery_method || typeof req.body.delivery_method === 'undefined' || req.body.delivery_method === null || req.body.delivery_method === '' || req.body.delivery_method === 0) {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.status || typeof req.body.status === 'undefined' || req.body.status === null || req.body.status === '' || req.body.status === 0) {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        user.getBalanceById(req.body.user_id, function(results) {
            if (results.success === 1) {
                var balance = results.balance;
                if (balance < req.body.quantity * req.body.ordering_price) {
                    return res.json({ status: -1, msg: 'Your balance is insufficient!' });
                } else {
                    var orderData = {
                        user_id: req.body.user_id,
                        product_id: req.body.product_id,
                        quantity: req.body.quantity,
                        ordering_price: req.body.ordering_price,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        middle_name: req.body.middle_name,
                        company: req.body.company,
                        email: req.body.email,
                        phone: req.body.phone,
                        country: req.body.country,
                        city: req.body.city,
                        province: req.body.province,
                        zip_code: req.body.zip_code,
                        address: req.body.address,
                        delivery_method: req.body.delivery_method,
                        status: req.body.status
                    }
                    product.placeOrder(orderData, function(results_1) {
                        if (results_1.status === 1) {
                            product.getProductInfoById(req.body.product_id, function(results_2) {
                                if (results_2.status === 1) {
                                    var seller_id = results_2.product.created_by;
                                    user.paidTo(req.body.user_id, seller_id, req.body.quantity * req.body.ordering_price, function(results_3) {
                                        if (results_3.success === 1) {
                                            return res.json({ status: 1, msg: 'Order has been successfully ordered!' });
                                        } else if (results_3.success === 0) {
                                            return res.json({ status: -9, msg: 'Invalid parameters!' });
                                        } else if (results_3.success === -1) {
                                            return res.json({ status: -10, msg: 'Database query error!' });
                                        }
                                    });
                                } else if (results_2.status === -1) {
                                    return res.json({ status: -7, msg: 'Database query error when getting product info!' });
                                } else if (results_2.status === -2) {
                                    return res.json({ status: -8, msg: 'No products exist for the product id!' });
                                }
                            });
                        } else if (results_1.status === 0) {
                            return res.json({ status: -5, msg: 'Invalid parameters!' });
                        } else if (results_1.status === -1) {
                            return res.json({ status: -6, msg: 'Database query error!' });
                        }
                    })
                }
            } else if (results.success === 0) {
                return res.json({ status: -2, msg: 'Invalid parameters!' });
            } else if (results.success === -1) {
                return res.json({ status: -3, msg: 'Database query error when getting user balance!' });
            } else if (results.success === -2) {
                return res.json({ status: -4, msg: 'No user exists for user id!' });
            }
        })
    },

    /**
     * Add by Michael
     */
    getCartList: function(req, res, next) {
        var query = `
            SELECT A.*, B.name, D.image_path AS image, B.current_price
            FROM carts AS A
            LEFT JOIN products AS B ON A.product_id=B.id
            LEFT JOIN product_image_relations AS C ON A.product_id=C.product_id
            LEFT JOIN product_images AS D ON C.image_id=D.id
            WHERE A.user_id=?
            GROUP BY A.id
        `;
        connection.query(query, [req.body.id], function(err, results) {
            if (err) {
                return res.json({ status: -1, err: err.stack });
            }
            return res.json({ status: 1, data: results });
        })
    },

    removeCart: function(req, res, next) {
        connection.query('DELETE FROM carts WHERE id=?', [req.body.id], function(err, results) {
            if (err) {
                return res.json({ status: -1 });
            }
            return res.json({ status: 1 });
        });
    },

    clearCart: function(req, res, next) {
        connection.query('DELETE FROM carts WHERE user_id=?', [req.body.id], function(err, results) {
            if (err) {
                return res.json({ status: -1 });
            }
            return res.json({ status: 1 });
        })
    },

    getImages: function(req, res, next) {
        var query = `
            SELECT GROUP_CONCAT(i.image_path) AS images FROM products p INNER JOIN product_images i ON p.id=i.product_id
            WHERE p.id = ?
        `;
        connection.query(query, req.body.id, function(err, results) {
            if (err) {
                return res.json({ status: -1, err: err.stack });
            }
            return res.json(results);
        })
    },

    update: function(req, res, next) {
        console.log(req.body);
        var brands = '';
        if (req.body.brands) {
            req.body.brands.forEach((brand, idx) => {
                brands += brand;
                if (idx != req.body.brands.length - 1)
                    brands += ',';
            });
        }

        var product = {
            name: req.body.name,
            title: req.body.title,
            sub_title: req.body.sub_title,
            condition_desc: req.body.condition_desc,
            description: req.body.description,
            selling_format: req.body.selling_format,
            duration: req.body.duration,
            starting_price: req.body.starting_price,
            current_price: req.body.now_price,
            reserve_price: req.body.reserve_price,
            quantity: req.body.quantity,
            sales_tax: req.body.sales_tax,
            created_by: req.body.user_id,
            condition_id: req.body.condition,
            orig_quantity: req.body.quantity,
            short_description: '',
            additional_info: '',
            ratings_count: 0,
            ratings_value: 0,
            created_on: mysql.raw('UNIX_TIMESTAMP()'),
            package_type: req.body.pktype,
            package_dimens_x: req.body.dimention_x,
            package_dimens_y: req.body.dimention_y,
            package_dimens_z: req.body.dimention_z,
            weight_type: req.body.weight,
            weight_lbs: req.body.lbs,
            weight_oz: req.body.oz,
            brands: brands,
            material: req.body.material,
            provenance: req.body.provenance,
            publish: 1
        }
        var upload_files = req.body.files;
        var colors = req.body.colors;
        var shippingObj = {
            domestic_type: req.body.shipping,
            domestic_service: req.body.service,
            domestic_handling_time: req.body.businessDay,
            internal_shipping_type: req.body.intern_shipping,
            shipping_to_type: req.body.ship_to,
            international_service: req.body.international_service,
            domestic_cost: req.body.domestic_cost,
            additional_location: req.body.additional_location,
            international_cost: req.body.international_shipping_cost,
            free: req.body.free,
            offer_local_pickup: req.body.offerLocalPickup,
            offical_cost: req.body.offical_cost
        };

        connection.query('UPDATE products SET ? WHERE id=?', [product, req.body.id], function(err, results) {
            if (err) {
                return res.json({ status: -1 });
            }

            // update shipping info
            connection.query('UPDATE shippings SET ? WHERE id=?', [shippingObj, req.body.shipping_id], function(err, results) {
                if (err)
                    console.log(err);
            });

            // update category
            connection.query('DELETE FROM product_cate_relations WHERE product_id=?', [req.body.id], function(err) {
                if (err) {
                    console.log(err);
                } else {
                    connection.query('INSERT INTO product_cate_relations SET ?', {
                        product_id: req.body.id,
                        category_id: req.body.category
                    }, function(err, results) {
                        if (err)
                            console.log(err);
                    })
                }
            });

            // update image
            connection.query('DELETE FROM product_images WHERE product_id=?', [req.body.id], function(err) {
                if (err) {
                    console.log(err);
                } else {
                    for (var i = 0; i < upload_files.length; i++) {
                        connection.query('INSERT INTO product_images SET ? ', { image_path: upload_files[i], product_id: req.body.id }, function(err, results) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                }
            });

            // update color
            connection.query('DELETE FROM product_color_relations WHERE product_id=?', [req.body.id], function(err) {
                if (err) {
                    console.log(err);
                } else {
                    if (colors) {
                        colors.forEach(color => {
                            connection.query('INSERT INTO product_color_relations SET ?', { color_id: color, product_id: req.body.id }, function(err) {
                                if (err) {
                                    console.log(err);
                                }
                            })
                        });
                    }
                }
            });

            return res.json({ status: 1 });
        });
    },

    getDiscountInfo: function(req, res, next) {
        if (!req.body.discount_id || typeof req.body.discount_id === 'undefined' || req.body.discount_id === null || req.body.discount_id === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        product.getDiscountInfo(req.body.discount_id, function(results) {
            return res.json(results);
        })
    },

    removeDiscount: function(req, res, next) {
        if (!req.body.discount_id || typeof req.body.discount_id === 'undefined' || req.body.discount_id === null || req.body.discount_id === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        product.removeDiscount(req.body.discount_id, function(results) {
            return res.json(results);
        })
    },

    updateDiscount: function(req, res, next) {
        if (!req.body.discount_id || typeof req.body.discount_id === 'undefined' || req.body.discount_id === null || req.body.discount_id === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        product.updateDiscount(req.body.discount_id, function(results) {
            return res.json(results);
        })
    },

    getByTitle: function(req, res, next) {
        var query = `
            SELECT p.* FROM products p 
            LEFT JOIN product_cate_relations pcr ON p.id=pcr.product_id
            WHERE title LIKE "%` + req.body.keyword + `%" AND pcr.category_id=?
        `;
        connection.query(query, [req.body.category], function(err, results) {
            if (err) {
                return res.json({ status: -1 });
            }
            return res.json(results);
        })
    },

    getOrderList: function(req, res, next) {
        if (!req.body.userId || typeof req.body.userId === 'undefined' || req.body.userId === null || req.body.userId === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        if (!req.body.type || typeof req.body.type === 'undefined' || req.body.type === null || req.body.type === '') {
            return res.json({ status: 0, msg: 'invalid parameters' });
        }

        product.getOrderListForBuyer(req.body.userId, req.body.type, function(res_1) {
            if (res_1.status === 1) {
                return res.json(res_1.orders);
            } else {
                return res.json([]);
            }
        });
    },

    getProductListByMinimumPriceAndQuantity: function(req, res, next) {
        var query = `
            SELECT p.name, p.id, p.current_price
            FROM products p
            WHERE p.current_price > ? AND p.quantity > ?
            ORDER BY p.name
        `;
        connection.query(query, [req.body.price, req.body.quantity], function(err, results) {
            if (err) {
                return res.json({ status: -1, msg: err.stack });
            }
            return res.json(results);
        })
    },

    /**
     * Add by Michael
     * prarams: category, min_price, max_price, search_keyword
     */
    getSaleEventSearchResult: function(req, res, next) {
        if (typeof req.body.min_price === 'undefined' || req.body.min_price === null || req.body.min_price === '') {
            return res({ success: 0, msg: 'invalid parameters for first name' });
        }

        if (typeof req.body.max_price === 'undefined' || req.body.max_price === null || req.body.max_price === '') {
            return res({ success: 0, msg: 'invalid parameters for first name' });
        }

        if (typeof req.body.page_index === 'undefined' || req.body.page_index === null || req.body.page_index === '') {
            return res({ success: 0, msg: 'invalid parameters for first name' });
        }

        if (!req.body.page_size || typeof req.body.page_size === 'undefined' || req.body.page_size === null || req.body.page_size === '' || req.body.page_size == 0) {
            return res({ success: 0, msg: 'invalid parameters for first name' });
        }

        if (req.body.min_price > req.body.max_price) {
            return res({ success: 0, msg: 'invalid parameters for first name' });
        }

        var query = `
            SELECT p.name, p.quantity, p.current_price, p.id, i.image_path thumnail_image
            FROM products p
            LEFT JOIN product_cate_relations pcr ON p.id=pcr.product_id
            LEFT JOIN categories c ON pcr.category_id =c.id
            LEFT JOIN product_images i ON i.product_id = p.id
            WHERE p.current_price > ? && p.current_price < ? AND p.title LIKE "%` + req.body.search_keyword + `%"
        `;

        if (!req.body.category || typeof req.body.category === 'undefined' || req.body.category === null || req.body.category === '') {

        } else {
            if (parseInt(req.body.category) !== 0) {
                query += ' AND c.id = ' + req.body.category;
            }
        }
        query += ` GROUP BY p.id`;

        var countQuery = query;

        query += ' LIMIT ' + req.body.page_index + ', ' + req.body.page_size;

        connection.query(query, [req.body.min_price, req.body.max_price], function(err, results) {
            if (err) {
                return res.json({ success: -1, msg: err.stack });
            }

            connection.query(countQuery, [req.body.min_price, req.body.max_price], function(err, results_1) {
                if (err) {
                    return res.json({ success: -1, msg: err.stack });
                }

                return res.json({ success: 1, msg: 'Succeed to get product list', products: results, count: results_1.length });
            });
        });
    }

}