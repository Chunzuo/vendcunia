var mysql = require('mysql');
var connection;

module.exports = {
    setConnection: function(con) {
        connection = con;
    },
    add: function(req, res, next) {
        connection.query('INSERT INTO colors SET ?', req.body, function(err, results) {
            if (err) {
                return res.json({ status: -1, err: err.stack });
            }
            return res.json({ status: 1, data: results });
        })
    },
    list: function(req, res, next) {
        connection.query('SELECT * FROM colors', function(err, results) {
            if (err) {
                return res.json({ status: -1, err: err.stack });
            }
            return res.json({ status: 1, data: results });
        })
    }
}