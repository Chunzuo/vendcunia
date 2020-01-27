"use strict";

const mysql = require('mysql');

var settings = require('../../config/settings');

var connection;

module.exports = {

    setConnection: function(con) {
        connection = con;
    },

    addNewVolumePricing: function(pricingInfo, res) {
        if (!pricingInfo || typeof pricingInfo === 'undefined' || pricingInfo === null || pricingInfo === '') {
            return res({ success: 0, msg: 'invalid parameters' });
        }

        connection.query('INSERT INTO volume_pricings SET ?', pricingInfo, function(err, results) {
            if (err) {
                return res({ success: -1, msg: 'database query error when inserting new volume pricing!' });
            }

            return res({ success: 1, msg: 'Successfully added new volume pricing', newId: results.insertId });
        });
    },

    getInfoByOfferName: function(offerName, res) {
        if (!offerName || typeof offerName === 'undefined' || offerName === null || offerName === '') {
            return res({ success: 0, msg: 'invalid parameters' });
        }

        connection.query('SELECT * FROM volume_pricings WHERE offer_name = ?', [offerName], function(err, results, fields) {
            if (err) {
                return res({ success: -1, msg: 'database query error when selecting records!' });
            }
            if (results.length == 0) {
                return res({ success: -2, msg: 'no records exist for product id!', info: null });
            } else {
                return res({ success: 1, msg: 'succeed to get records!', info: results[0] });
            }
        })
    }    

}