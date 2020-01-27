"use strict";

exports.run = function(io) {

    io.sockets.on("connection", function(socket) {

        console.log('ws client connected!');

        socket.emit("connected", { socketId: socket.id });

        socket.on("disconnect", function() {
            io.sockets.emit('poker_socket_response', {
                type: 11,
                socketId: socket.id
            });
        });

    });

}