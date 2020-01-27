'use strict';

var mysql = require('mysql');
var multer = require('multer');

var settings = require('../../../config/settings');

var product = require('../../models/product');
var volume_pricing = require('../../models/volume_pricings');
var volume_pricing_product_rels = require('../../models/volume_pricing_product_rels');

var connection;

module.exports = {

    setConnection: function(con) {
        connection = con;

        product.setConnection(con);
        volume_pricing.setConnection(con);
        volume_pricing_product_rels.setConnection(con);
    },

    getOrderDiscountImages: function(req, res, next) {
        connection.query('SELECT * FROM order_discount_images', function(err, images) {
            if (err) {
                return res.json({ status: -1 });
            }
            return res.json({ status: 1, images: images });
        });
    },

    uploadOrderDiscount: function(req, res, next) {
        var file_path = settings.server_url + req.file.path.replace("uploads", "").replace('\\', "/").replace('\\', "/").replace('\\', "/");
        connection.query('INSERT INTO order_discount_images SET ?', { path: file_path }, function(err, results) {
            if (!err) {
                res.send(file_path);
            }
        });
    },

    uploadShippingDiscount: function(req, res, next) {
        var file_path = settings.server_url + req.file.path.replace("uploads", "").replace('\\', "/").replace('\\', "/").replace('\\', "/");
        connection.query('INSERT INTO shipping_discount_images SET ?', { path: file_path }, function(err, results) {
            if (!err) {
                res.send(file_path);
            }
        });
    },
    uploadSaleEvent: function(req, res, next) {
        var file_path = settings.server_url + req.file.path.replace("uploads", "").replace('\\', "/").replace('\\', "/").replace('\\', "/");
        connection.query('INSERT INTO sale_event_images SET ?', { path: file_path }, function(err, results) {
            if (!err) {
                res.send(file_path);
            }
        });
    },

    /**
     * Add by Michael
     */
    addOrderDiscount: function(req, res, next) {
        // add promotion type
        var promotionTypeObj = {
            discount_value: req.body.discount_value,
            event_value: req.body.event_value,
            buy_number: req.body.buy_number,
            get_number: req.body.get_number,
            discount_type: req.body.discount_type,
            message: req.body.message
        };
        connection.query('INSERT INTO order_discount_types SET ?', promotionTypeObj, function(err, newPromotionType) {
            if (err) {
                console.log(err);
                return res.json({ staus: -1, err: err.stack });
            }
            var type = newPromotionType.insertId;

            // get selected promotion image id.
            connection.query('SELECT * FROM order_discount_images WHERE path LIKE "%' + req.body.image + '%"', function(err, findImage) {
                if (err) {
                    console.log(err);
                    return res.json({ status: -1, err: err.stack });
                }
                var imageId = findImage[0].id;
                // add Promotion
                var promotionObj = {
                    type: type,
                    image: imageId,
                    event_name: req.body.name,
                    start_date: mysql.raw('UNIX_TIMESTAMP("' + req.body.start_date + '")'),
                    end_date: mysql.raw('UNIX_TIMESTAMP("' + req.body.end_date + '")'),
                    description: req.body.description
                };
                connection.query('INSERT INTO order_discounts SET ?', promotionObj, function(err, newPromotion) {
                    if (err) {
                        console.log(err);
                        return res.json({ status: -1, err: err.stack });
                    }
                    var promotionId = newPromotion.insertId;
                    // make links between products.
                    req.body.products.forEach(productId => {
                        connection.query('INSERT INTO product_order_discount_relations SET ?', { product_id: productId, order_discount_id: promotionId }, function(err, results) {
                            if (err) {
                                return res.json({ status: -1, err: err.stack });
                            }
                        })
                    });
                    return res.json({ status: 1, msg: 'OK' });
                })
            })
        })
    },

    launchVolumePricing: function(req, res, next) {
        if (!req.body.offer_name || typeof req.body.offer_name === 'undefined' || req.body.offer_name === null || req.body.offer_name === '') {
            return res.json({ status: 0, msg: 'invalid parameters for offer name' });
        }

        if (typeof req.body.two_items_percent === 'undefined' || req.body.two_items_percent === null || req.body.two_items_percent === '') {
            return res.json({ status: 0, msg: 'invalid parameters for two items percent' });
        }

        if (typeof req.body.three_items_percent === 'undefined' || req.body.three_items_percent === null || req.body.three_items_percent === '') {
            return res.json({ status: 0, msg: 'invalid parameters for two items percent' });
        }

        if (typeof req.body.four_items_percent === 'undefined' || req.body.four_items_percent === null || req.body.four_items_percent === '') {
            return res.json({ status: 0, msg: 'invalid parameters for two items percent' });
        }

        if (!req.body.item_ids || typeof req.body.item_ids === 'undefined' || req.body.item_ids === null || req.body.item_ids === '') {
            return res.json({ status: 0, msg: 'invalid parameters for two items percent' });
        }

        if (typeof req.body.from_time === 'undefined' || req.body.from_time === null) {
            return res.json({ status: 0, msg: 'invalid parameters for two items percent' });
        }

        var fromSec = 0;
        var toSec = 0;
        var to;
        if (req.body.from_time === '') {
            const now = new Date();
            const nowSec = parseInt(now.getTime() / 1000, 10);
            fromSec = nowSec;

            to = new Date('2050-01-01 00:00:00');
            toSec = parseInt(to.getTime() / 1000, 10);
        } else {
            var fromDateFullString = req.body.from_date.toString();
            var fromDateStrString = fromDateFullString.substring(0, fromDateFullString.indexOf("T"));
            const from = new Date(fromDateStrString + ' ' + req.body.from_time);
            fromSec = parseInt(from.getTime() / 1000, 10);

            var toDateFullString = req.body.to_date.toString();
            var toDateStrString = toDateFullString.substring(0, toDateFullString.indexOf("T"));
            to = new Date(toDateStrString + ' ' + req.body.to_time);
            toSec = parseInt(to.getTime() / 1000, 10);
        }

        if (fromSec > toSec) {
            return res.json({ status: 0, msg: 'invalid parameters for two items percent' });
        }

        const pricingInfo = {
            offer_name: req.body.offer_name,
            two_items_percent: req.body.two_items_percent,
            three_items_percent: req.body.three_items_percent,
            four_items_percent: req.body.four_items_percent,
            from: fromSec,
            to: toSec
        };

        var addedVolumePricingCount = 0;

        volume_pricing.getInfoByOfferName(req.body.offer_name, function(results) {
            if (results.success === 1) {
                return res.json({ status: -2, msg: 'Duplicated offer name for volume pricing' });
            } else if (results.success === 0) {
                return res.json({ status: 0, msg: results.msg });
            } else if (results.success === -1) {
                return res.json({ status: -1, msg: results.msg });
            } else if (results.success === -2) {
                volume_pricing.addNewVolumePricing(pricingInfo, function(results_1) {
                    if (results_1.success === 1) {
                        var insertedVolumePricingId = results_1.newId;

                        var itemIdsArr = Array();

                        var itemIdsStr = req.body.item_ids.toString();
                        var tempItemIdsArr = itemIdsStr.split("\n");
                        for (var i = 0; i < tempItemIdsArr.length; i++) {
                            var tempItemIdsArr_1 = tempItemIdsArr[i].toString().split(",");
                            for (var j = 0; j < tempItemIdsArr_1.length; j++) {
                                itemIdsArr.push(tempItemIdsArr_1[j]);
                            }
                        }

                        for (var i = 0; i < itemIdsArr.length; i++) {
                            var itemId = itemIdsArr[i];
                            product.getProductInfoById(itemId, function(results_2) {
                                if (results_2.status === 1) {
                                    volume_pricing_product_rels.getInfoByProductId(results_2.product.id, function(results_3) {
                                        if (results_3.success === -2) {
                                            volume_pricing_product_rels.addNewVolumePricingProductRels(results_3.productId, insertedVolumePricingId, function(results_4) {
                                                if (results_4.success === 1) {
                                                    addedVolumePricingCount++;
                                                    if (addedVolumePricingCount === itemIdsArr.length) {
                                                        return res.json({ status: 1, msg: 'OK' });
                                                    }
                                                } else if (results_4.success === 0) {
                                                    return res.json({ status: 0, msg: results_4.msg });
                                                } else if (results_4.success === -1) {
                                                    return res.json({ status: -1, msg: results_4.msg });
                                                }
                                            });
                                        } else if (results_3.success === 1) {
                                            addedVolumePricingCount++;
                                        } else if (results_3.success === 0) {
                                            return res.json({ status: 0, msg: results_3.msg });
                                        } else if (results_3.success === -1) {
                                            return res.json({ status: -1, msg: results_3.msg });
                                        }
                                    });
                                } else if (results_2.status === 0) {
                                    return res.json({ status: 0, msg: results_2.msg });
                                } else if (results_2.status === -1) {
                                    return res.json({ status: -1, msg: results_2.msg });
                                } else if (results_2.status === -2) {
                                    return res.json({ status: -2, msg: results_2.msg });
                                }
                            });
                        }
                    } else if (results_1.success === 0) {
                        return res.json({ status: 0, msg: results_1.msg });
                    } else if (results_1.success === -1) {
                        return res.json({ status: -1, msg: results_1.msg });
                    }
                });
            }
        });
    },

    /**
     * Add by Michael
     */
    addShipDiscount: function(req, res, next) {
        console.log(req.body);
        // add new shipping discount object.
        var shipDiscountObj = {
            economy_check: req.body.economy_check,
            economy_price: req.body.economy_price,
            standard_check: req.body.standard_check,
            standard_price: req.body.standard_price,
            expected_check: req.body.expected_check,
            expected_price: req.body.expected_price,
            twoday_check: req.body.twoday_check,
            twoday_price: req.body.twoday_price,
            overnight_check: req.body.overnight_check,
            overnight_price: req.body.overnight_price,
            description: req.body.description,
            title: req.body.title,
            start_date: mysql.raw('UNIX_TIMESTAMP("' + req.body.start_date + '")'),
            end_date: mysql.raw('UNIX_TIMESTAMP("' + req.body.end_date + '")'),
            priority: req.body.priority,
            image_path: req.body.image_path,
            promotional_check: req.body.promotional_check,
            promotional_price: req.body.promotional_price,
            min_price: req.body.min_price,
            min_amount: req.body.min_amount
        };

        connection.query('INSERT INTO shipping_discounts SET ?', shipDiscountObj, function(err, newShippingDiscount) {
            if (err) {
                console.log(err);
                return res.json({ status: -1, msg: err.stack });
            }
            var shippingDiscountId = newShippingDiscount.insertId;
            // make junction data between <products> and <shipping_discounts>
            req.body.products.forEach(productId => {
                connection.query('INSERT INTO product_shipping_discount_relations SET ?', {
                    product_id: productId,
                    shipping_discount_id: shippingDiscountId
                }, function(err, results) {
                    if (err) {
                        return res.json({ status: -1, msg: err.stack });
                    }
                })
            });
            return res.json({ status: 1, msg: 'OK' });
        })
    },

    addSaleEvent: function(req, res, next) {
        connection.query('SELECT * FROM sale_event_images WHERE path LIKE "%' + req.body.image_path + '%"', function(err, findImage) {
            var imageId = findImage[0].id;
            var saleEventObj = {
                event_name: req.body.event_name,
                type: req.body.type,
                discount_value: req.body.discount_value,
                event_value: req.body.event_value,
                description: req.body.description,
                start_date: mysql.raw('UNIX_TIMESTAMP("' + req.body.start_date + '")'),
                end_date: mysql.raw('UNIX_TIMESTAMP("' + req.body.end_date + '")'),
                message: req.body.message,
                image_id: imageId
            };
            connection.query('INSERT INTO sale_events SET ?', saleEventObj, function(err, newSaleEvent) {
                if (err) {
                    console.log(err);
                    return res.json({ status: -1, err: err.stack });
                }
                var saleEventId = newSaleEvent.insertId;
                req.body.products.forEach(productId => {
                    connection.query('INSERT INTO product_sale_event_relations SET ?', {
                        product_id: productId,
                        sale_event_id: saleEventId
                    }, function(err) {
                        if (err) {
                            console.log(err);
                            return res.json({ staus: -1, err: err.stack });
                        }
                    })
                })
                return res.json({ status: 1 });
            })
        })
    },

    getSaleEventImages: function(req, res, next) {
        connection.query('SELECT * FROM sale_event_images', function(err, images) {
            if (err) {
                return res.json({ status: -1 });
            }
            return res.json(images);
        });
    }

}