'use strict';

var connection;

module.exports = {
    setConnection: function(con) {
        connection = con;
    },
    list: function(req, res, next) {
        connection.query('SELECT * FROM categories WHERE parent_id=?', [req.body.parent_id], function(err, results) {
            if (err) {
                return res.json({ status: -1, msg: err });
            }
            return res.json(results);
        })
    }
}