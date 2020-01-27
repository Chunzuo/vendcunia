"use strict";

var mysql = require('mysql');
var connection;

module.exports = {

    setConnection: function(con) {
        connection = con;
    },

    getContacts: function(email, res) {
        if (!email || email === null || email === '') {
            return res(email, []);
        }

        var query = `
            SELECT A.sender_id, A.receiver_id, A.created_at, A.is_accept, B.login_name AS sender_login_name, C.login_name AS receiver_login_name,
                B.email AS sender_email, C.email AS receiver_email, B.first_name AS sender_first_name, C.first_name AS receiver_first_name,
                B.last_name AS sender_last_name, C.last_name AS receiver_last_name, B.is_online AS sender_is_online, C.is_online AS receiver_is_online,
                B.socket_id AS sender_socket_id, C.socket_id AS receiver_socket_id
            FROM contacts A
            LEFT JOIN users B ON A.sender_id = B.id
            LEFT JOIN users C ON A.receiver_id = C.id
        `;

        connection.query(query + ' WHERE (B.email = ? OR C.email = ?) AND A.is_accept = 1', [email, email], function(err, results, fields) {
            if (results.length === 0) {
                return res(email, []);
            } else {
                let contacts = [];
                for (let i = 0; i < results.length; i++) {
                    let status = 3; // offline

                    if (results[i].sender_email === email) {
                        if (results[i].receiver_socket_id !== null)
                            status = 0; // online

                        contacts.push({
                            id: results[i].receiver_socket_id,
                            displayName: results[i].receiver_email,
                            status: status,
                            avatar: null
                        });
                    } else {
                        if (results[i].sender_socket_id !== null)
                            status = 0; // online

                        contacts.push({
                            id: results[i].sender_socket_id,
                            displayName: results[i].sender_email,
                            status: status,
                            avatar: null
                        });
                    }
                }
                return res(email, contacts);
            }
        })
    },

    getContacts_all: function(email, res) {
        if (!email || email === null || email === '') {
            return res(email, []);
        }

        var query = `
            SELECT A.sender_id, A.receiver_id, A.created_at, A.is_accept, B.login_name AS sender_login_name, C.login_name AS receiver_login_name,
                B.email AS sender_email, C.email AS receiver_email, B.first_name AS sender_first_name, C.first_name AS receiver_first_name,
                B.last_name AS sender_last_name, C.last_name AS receiver_last_name, B.is_online AS sender_is_online, C.is_online AS receiver_is_online,
                B.socket_id AS sender_socket_id, C.socket_id AS receiver_socket_id
            FROM contacts A
            LEFT JOIN users B ON A.sender_id = B.id
            LEFT JOIN users C ON A.receiver_id = C.id
        `;

        connection.query(query + ' WHERE B.email = ? OR C.email = ?', [email, email], function(err, results, fields) {
            if (results.length === 0) {
                return res(email, []);
            } else {
                let contacts = [];
                for (let i = 0; i < results.length; i++) {
                    let status = 3; // offline

                    if (results[i].sender_email === email) {
                        if (results[i].receiver_socket_id !== null)
                            status = 0; // online

                        contacts.push({
                            id: results[i].receiver_socket_id,
                            displayName: results[i].receiver_email,
                            status: status,
                            avatar: null
                        });
                    } else {
                        if (results[i].sender_socket_id !== null)
                            status = 0; // online

                        contacts.push({
                            id: results[i].sender_socket_id,
                            displayName: results[i].sender_email,
                            status: status,
                            avatar: null
                        });
                    }
                }
                return res(email, contacts);
            }
        })
    }

}