'use strict';

var user = require('../models/user');
var messageCtrl = require('../app/controllers/front/message');

module.exports = function(io, connection) {

    io.on('connection', function(socket) {

        // console.log('sever -> mail.js, line : 10, socket id : ' + socket.id);

        user.setConnection(connection);
        messageCtrl.setConnection(connection);

        /**
         * Created by Michael
         */
        socket.on('sendEmail', function(mailInfo) {
            messageCtrl.send(mailInfo, function(err, msgSaveResult) {
                if (err) {
                    return;
                }
                var savedMsgId = msgSaveResult.insertId;
                user.getSocketIdByEmail(mailInfo.receiver_email, function(results) {
                    if (results.success == 1) {
                        io.to(results.socket_id).emit('receiveEmail', mailInfo.sender_email);
                    }
                })
            });
        });

    });

}