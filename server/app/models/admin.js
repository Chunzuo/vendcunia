"use strict";

var mysql = require('mysql');
var connection;

module.exports = {

    setConnection: function(con) {
        connection = con;
    },

    login: function(socketId, res) {
        if (!socketId || typeof socketId === 'undefined' || socketId === null || socketId === '') {
            return res({ success: 0, msg: 'invalid parameters for socket id' });
        }

        connection.query('SELECT email FROM users WHERE socket_id = ?', [socketId], function(err, results, fields) {
            if (err) {
                return res({ success: -1, msg: 'database query error when selecting receiver id!' });
            }
            if (results.length == 0) {
                return res({ success: -2, msg: 'no user exist for receiver email!', email: '' });
            } else {
                return res({ success: 1, msg: 'succeed to get email!', email: results[0].email });
            }
        })
    }

}