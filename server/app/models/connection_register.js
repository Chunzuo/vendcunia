"use strict";

var mysql = require('mysql');

var connection;

module.exports = {

    setConnection: function(con) {
        connection = con;
    },

    addLoginHistory: function(userId, ipAddress, res) {
        if (!userId || typeof userId === 'undefined' || userId === null || userId === '') {
            return res({ success: 0, msg: 'invalid parameters for user id' });
        }

        if (!ipAddress || typeof ipAddress === 'undefined' || ipAddress === null || ipAddress === '') {
            return res({ success: 0, msg: 'invalid parameters for ip address' });
        }

        const loginHistoryInfo = {
            user_id: userId,
            connection_time: new Date(),
            ip_address: ipAddress
        };
        connection.query('INSERT INTO connection_register SET ?', loginHistoryInfo, function(err, results, fields) {
            if (err) {
                return res({ success: -1, msg: 'database query error when inserting chat message!' });
            }
            return res({ success: 1 });
        })
    }

}