'use strict';

var login = require('./login');
var chat = require('./chat');
var product = require('./product');

module.exports = function(io, connection) {

    login(io, connection);
    chat(io, connection);
    product(io, connection);

}