"use strict";

const mysql = require('mysql');

var settings = require('../../config/settings');

var connection;

module.exports = {

    setConnection: function(con) {
        connection = con;
    },

    getInfoByUserId: function(userId, res) {
        if (!userId || typeof userId === 'undefined' || userId === null || userId === '') {
            return res({ success: 0, msg: 'invalid parameters for user id' });
        }

        connection.query('SELECT * FROM users_groups WHERE user_id = ?', [userId], function(err, results, fields) {
            if (err) {
                return res({ success: -1, msg: 'database query error when getting user group info!' });
            }
            if (results.length == 0) {
                return res({ success: -2, msg: 'no user group relation info exist for user id', userGroupInfo: null });
            } else {
                return res({ success: 1, msg: 'succeed to get user group info!', userGroupInfo: results[0] });
            }
        });
    },

    addNewUserGroupInfo: function(userId, groupId, res) {
        if (!userId || typeof userId === 'undefined' || userId === null || userId === '') {
            return res({ success: 0, msg: 'invalid parameters for user id' });
        }

        if (!groupId || typeof groupId === 'undefined' || groupId === null || groupId === '') {
            return res({ success: 0, msg: 'invalid parameters for group id' });
        }

        var usersGroupsInfo = {
            user_id: userId,
            group_id: groupId
        }

        connection.query('INSERT INTO users_groups SET ?', usersGroupsInfo, function(err, results) {
            if (err) {
                return res({ success: -1, msg: 'database query error when inserting new user group info!' });
            }

            return res({ success: 1, msg: 'Successfully added new user group info', newUserGroupId: results.insertId });
        });
    }

}