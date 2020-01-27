"use strict";

const mysql = require('mysql');

var settings = require('../../config/settings');

var connection;

module.exports = {

    setConnection: function(con) {
        connection = con;
    },

    addNewVolumePricingProductRels: function(productId, volumePricingId, res) {
        if (!productId || typeof productId === 'undefined' || productId === null || productId === '') {
            return res({ success: 0, msg: 'invalid parameters' });
        }

        if (!volumePricingId || typeof volumePricingId === 'undefined' || volumePricingId === null || volumePricingId === '') {
            return res({ success: 0, msg: 'invalid parameters' });
        }

        var pricingProductRelsInfo = {
            product_id: productId,
            volume_pricing_id: volumePricingId
        }

        connection.query('INSERT INTO volume_pricing_product_rels SET ?', pricingProductRelsInfo, function(err, results) {
            if (err) {
                return res({ success: -1, msg: 'database query error when inserting new volume pricing!' });
            }

            return res({ success: 1, msg: 'Successfully added new volume pricing', newId: results.insertId });
        });
    },

    getInfoByProductId: function(productId, res) {
        if (!productId || typeof productId === 'undefined' || productId === null || productId === '') {
            return res({ success: 0, msg: 'invalid parameters' });
        }

        connection.query('SELECT * FROM volume_pricing_product_rels WHERE product_id = ?', [productId], function(err, results, fields) {
            if (err) {
                return res({ success: -1, msg: 'database query error when selecting records!', productId: productId });
            }
            if (results.length == 0) {
                return res({ success: -2, msg: 'no records exist for product id!', info: null, productId: productId });
            } else {
                return res({ success: 1, msg: 'succeed to get records!', info: results[0], productId: productId });
            }
        })
    }

}