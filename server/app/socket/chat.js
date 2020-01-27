'use strict';

var chat = require('../models/chat');
var contact = require('../models/contact');
var user = require('../models/user');

module.exports = function(io, connection) {

    io.on('connection', function(socket) {

        // console.log('sever -> chat.js, line : 11, socket id : ' + socket.id);

        chat.setConnection(connection);
        contact.setConnection(connection);
        user.setConnection(connection);

        socket.on('join', function(email) {
            console.log(email + " has joined the chat room.");

            socket.emit("generatedUserId", socket.id);

            socket.on('disconnect', function() {
                console.log('User disconnected!');
                connection.query('UPDATE users SET socket_id = ? WHERE email = ?', [null, email], function(err, results) {
                    if (err) {
                        return;
                    }

                    contact.getContacts(email, function(receiver_email, res) {
                        for (let i = 0; i < res.length; i++) {
                            contact.getContacts(res[i].displayName, function(receiver_email, res_1) {
                                user.getSocketIdByEmail(receiver_email, function(results) {
                                    if (results.success == 1) {
                                        io.to(results.socket_id).emit("friendsListChanged", res_1);
                                    }
                                })
                            })
                        }
                        socket.emit("friendsListChanged", res);
                    })
                })
            });

            connection.query('UPDATE users SET socket_id = ? WHERE email = ?', [socket.id, email], function(err, results) {
                if (err) {
                    return;
                }

                contact.getContacts(email, function(receiver_email, res) {
                    for (let i = 0; i < res.length; i++) {
                        contact.getContacts(res[i].displayName, function(receiver_email, res_1) {
                            user.getSocketIdByEmail(receiver_email, function(results) {
                                if (results.success == 1) {
                                    io.to(results.socket_id).emit("friendsListChanged", res_1);
                                }
                            })
                        })
                    }
                    socket.emit("friendsListChanged", res);
                })
            })
        });

        socket.on("sendMessage", function(messageInfo) {
            if (!messageInfo.message.toId || messageInfo.message.toId == null || messageInfo.message.toId == '') {
                return;
            }

            if (!messageInfo.message.message || messageInfo.message.message == null || messageInfo.message.message == '') {
                return;
            }

            user.getEmailBySocketId(messageInfo.message.toId, function(results) {
                if (results.success == 1) {
                    chat.addChatMessage(messageInfo.sender_email, results.email, messageInfo.message.message, function(results_1) {
                        if (results_1.success == 1) {
                            var status = 0;

                            io.to(messageInfo.message.toId).emit("messageReceived", {
                                user: {
                                    id: messageInfo.message.fromId,
                                    displayName: messageInfo.sender_email,
                                    status: 0,
                                    avatar: 0
                                },
                                message: messageInfo.message
                            });
                        }
                    })
                }
            })
        });

        socket.on('sendContact', function(data) {
            var email = data.email;
            var receiver_email = data.receiver_email;

            contact.getContacts_all(email, function(my_email, res) {
                for (let i = 0; i < res.length; i++) {
                    if (res[i].displayName == data.receiver_email) {
                        contact.getContacts_all(res[i].displayName, function(receiver_email, res_1) {
                            user.getSocketIdByEmail(receiver_email, function(results) {
                                if (results.success == 1) {
                                    io.to(results.socket_id).emit("contactReceived", res_1);
                                } else {}
                            })
                        })
                    }
                }
            })
        });

    });

}