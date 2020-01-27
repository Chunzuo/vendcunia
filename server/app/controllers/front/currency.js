'use strict';

var connection;

module.exports = {

    setConnection: function(con) {
        connection = con;
    },

    list: function(req, res, next) {
        connection.query('SELECT * FROM currencies', function(err, results) {
            if (err) {
                return res.json({ status: -1 });
            }
            return res.json({ status: 1, data: results });
        })
    },

    load: function(req, res, next) {
        connection.query('SELECT * FROM currencies WHERE id=?', [req.params.id], function(err, results) {
            if (err) {
                return res.json({ status: -1 });
            }
            return res.json({ status: 1, data: results[0] });
        })
    }

}