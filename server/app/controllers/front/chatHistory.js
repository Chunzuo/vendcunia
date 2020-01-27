'use strict';

var chat = require('../../models/chat');
var connection;

module.exports = {

    setConnection: function(con) {
        connection = con;
        chat.setConnection(con);
    },

    add: function(req, res, next) {
        chat.addChatMessage(req.body.sender_email, req.body.receiver_email, req.body.message, function(results) {
            return res.json(results);
        })
    }

}