'use strict';

var product = require('../models/product');
var user = require('../models/user');

module.exports = function(io, connection) {

    io.on('connection', function(socket) {

        product.setConnection(connection);
        user.setConnection(connection);

        socket.on('getRemainTime', function(productId) {
            setInterval(() => {
                product.getRemainTime(productId, function(res) {
                    if (res.status === 1) {
                        var remainTime = {
                            hour: res.hour,
                            min: res.min,
                            sec: res.sec
                        }
                        socket.emit('remainTimeChanged', remainTime);
                    }
                });
            }, 10000);
        });

        socket.on('addWishList', function(data) {
            product.addWishList(data.userId, data.productId, function(res) {
                if (res.status == 1) {
                    getWishListCount(data.userId);
                }
                socket.emit('addWishListResponse', status);
            });
        });

        socket.on('addCompare', function(data) {
            product.addCompare(data.userId, data.productId, function(res) {
                if (res.status == 1) {
                    product.getCompareCount(data.userId, function(res_1) {
                        if (res_1.status == 1) {
                            socket.emit('compareChanged', res_1.count);
                        }
                    });
                }
                socket.emit('addCompareResponse', status);
            });
        });

        /**
         * Modified by Michael
         */
        socket.on('addCart', function(data) {
            product.addCart(data.userId, data.productId, data.quantity, data.price, function(res) {
                if (res.status == 1) {
                    // product.getCartCount(data.userId, function(res_1) {
                    //     if (res_1.status == 1) {
                    //         socket.emit('cartChanged', res_1.count);
                    //     }
                    // });
                    getCartList(data.userId);
                }
                // socket.emit('addCartResponse', status);
            });
        });

        socket.on('getWishListCount', function(userId) {
            getWishListCount(userId);
            // product.getWishListCount(userId, function(res) {
            //     if (res.status == 1) {                    
            //         socket.emit('wishListChanged', res.count);
            //     }
            // });
        });

        socket.on('getCompareCount', function(userId) {
            getCompareCount(userId);
        });

        socket.on('getCartCount', function(userId) {
            product.getCartCount(userId, function(res) {
                if (res.status == 1) {
                    socket.emit('cartChanged', res.count);
                }
            });
        });

        socket.on('getWishList', function(userId) {
            getWishList(userId);
        });

        socket.on('removeWish', function(data) {
            product.removeWish(data.wishId, function(res) {
                getWishListCount(data.userId);
                getWishList(data.userId);
            })
        });

        socket.on('clearWish', function(userId) {
            product.clearWish(userId, function(err) {
                if (!err) {
                    getWishListCount(userId);
                    getWishList(userId);
                }
            })
        });

        socket.on('getCartList', function(userId) {
            getCartList(userId);
        });

        socket.on('removeCart', function(data) {
            product.removeCart(data.cartId, function(err) {
                if (!err) {
                    getCartList(data.userId);
                }
            })
        });

        socket.on('clearCart', function(userId) {
            product.clearCart(userId, function(err) {
                if (!err) {
                    getCartList(userId);
                }
            });
        });

        socket.on('getCompareList', function(userId) {
            getCompareList(userId);
        });

        socket.on('removeCompare', function(data) {
            product.removeCompare(data.compareId, function(err) {
                if (!err) {
                    getCompareCount(data.userId);
                    getCompareList(data.userId);
                }
            })
        });

        socket.on('clearCompare', function(userId) {
            product.clearCompare(userId, function(err) {
                if (!err) {
                    getCompareCount(userId);
                    getCompareList(userId);
                }
            });
        });

        socket.on('sendDiscountOffer', function(discountOfferInfo) {
            if (!discountOfferInfo.sender_email || typeof discountOfferInfo.sender_email === 'undefined' || 
                    discountOfferInfo.sender_email === null || discountOfferInfo.sender_email === '') {
                return;
            }

            if (!discountOfferInfo.receiver_email || typeof discountOfferInfo.receiver_email === 'undefined' || 
                    discountOfferInfo.receiver_email === null || discountOfferInfo.receiver_email === '') {
                return;
            }

            if (!discountOfferInfo.title || typeof discountOfferInfo.title === 'undefined' || discountOfferInfo.title === null || discountOfferInfo.title === '') {
                return;
            }

            if (!discountOfferInfo.content || typeof discountOfferInfo.content === 'undefined' || discountOfferInfo.content === null || discountOfferInfo.content === '') {
                return;
            }

            user.getSocketIdByEmail(discountOfferInfo.receiver_email, function(res) {
                if (res.success === 1) {
                    var discountInfo = {
                        sender_email: discountOfferInfo.sender_email,
                        receiver_email: discountOfferInfo.receiver_email,
                        title: discountOfferInfo.title,
                        content: discountOfferInfo.content
                    }
                    io.emit('discountOfferReceived', discountInfo);
                }
            });
        });

        socket.on('sendDiscountOfferHandler', function(discountOfferHandlerInfo) {
            if (!discountOfferHandlerInfo.sender_email || typeof discountOfferHandlerInfo.sender_email === 'undefined' || 
                    discountOfferHandlerInfo.sender_email === null || discountOfferHandlerInfo.sender_email === '') {
                return;
            }

            if (!discountOfferHandlerInfo.receiver_email || typeof discountOfferHandlerInfo.receiver_email === 'undefined' || 
                    discountOfferHandlerInfo.receiver_email === null || discountOfferHandlerInfo.receiver_email === '') {
                return;
            }

            if (!discountOfferHandlerInfo.status || typeof discountOfferHandlerInfo.status === 'undefined' ||
                    discountOfferHandlerInfo.status === null || discountOfferHandlerInfo.status === '') {
                return;
            }

            if (!discountOfferHandlerInfo.discount_id || typeof discountOfferHandlerInfo.discount_id === 'undefined' ||
                    discountOfferHandlerInfo.discount_id === null || discountOfferHandlerInfo.discount_id === '') {
                return;
            }

            product.getDiscountProductInfo(discountOfferHandlerInfo.discount_id, function(res) {
                if (res.status === 1) {
                    var discountInfo = res.discount;
                    
                    var title = 'Your discount offer accepted!';
                    if (discountOfferHandlerInfo.status === 'reject') {
                        title = 'Your discount offer rejected!';
                    }

                    var content = discountOfferHandlerInfo.sender_email;
                    if (discountOfferHandlerInfo.status === 'accept') {
                        content += ' accepted your discount offer (';
                    } else if (discountOfferHandlerInfo.status === 'reject') {
                        content += ' rejected your discount offer (';
                    }

                    content = content + 'price ' + discountInfo.discount_price + ' for product ' + discountInfo.product_name + ')';

                    user.getSocketIdByEmail(discountOfferHandlerInfo.receiver_email, function(res) {
                        if (res.success === 1) {
                            var msgInfo = {
                                sender_email: discountOfferHandlerInfo.sender_email,
                                receiver_email: discountOfferHandlerInfo.receiver_email,
                                title: title,
                                content: content
                            }
                            io.emit('discountOfferHandleReceived', msgInfo);
                        }
                    });
                }
            });
        });

        // Common functions
        function getWishListCount(userId) {
            product.getWishListCount(userId, function(res_1) {
                if (res_1.status == 1) {
                    socket.emit('wishListChanged', res_1.count);
                }
            });
        }

        function getWishList(userId) {
            product.getWishList(userId, function(res) {
                if (res.status == 1) {
                    socket.emit('getWishListResponse', res.data);
                }
            })
        }

        function getCartList(userId) {
            product.getCartList(userId, function(err, results) {
                if (!err) {
                    socket.emit('getCartListResponse', results);
                }
            })
        }

        function getCompareList(userId) {
            product.getCompareList(userId, function(err, results) {
                if (!err) {
                    socket.emit('getCompareListResponse', results);
                }
            })
        }

        function getCompareCount(userId) {
            product.getCompareCount(userId, function(res) {
                if (res.status == 1) {
                    socket.emit('compareChanged', res.count);
                }
            });
        }
    });

}