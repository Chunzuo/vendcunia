'use strict';

var connection

module.exports = {
    setConnection: function(con) {
        connection = con
    },
    create: function(req, res, next) {
        var conditionObj = {
            name: req.body.name,
            description: req.body.desc
        }
        connection.query('INSERT INTO product_conditions SET ?', conditionObj, function(err, results) {
            if (err) {
                return res.json({ status: -1, msg: err })
            }
            return res.json({ status: 1, msg: 'success' })
        })
    },
    list: function(req, res, next) {
        connection.query('SELECT * FROM product_conditions', function(err, results) {
            if (err) {
                return res.json({ status: -1, msg: err })
            }
            return res.json(results)
        })
    }
}