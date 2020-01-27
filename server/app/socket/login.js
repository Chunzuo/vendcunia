'use strict';

module.exports = function(io, connection) {

    io.on('connection', function(socket) {

        // console.log('sever -> login.js, line : 7, socket id : ' + socket.id);

        socket.on('login', function(email) {
            connection.query('UPDATE users SET socket_id = ? WHERE email = ?', [socket.id, email], function(err, results) {
                if (err) {
                    return;
                }
                socket.emit("loginResponse", socket.id);
            })
        });

    });

}