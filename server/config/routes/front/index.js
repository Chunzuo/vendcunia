var express = require('express')
var router = express.Router()
var multer = require('multer')

var frontCtrl = require('../../../app/controllers/front')

module.exports = function(connection) {

    frontCtrl.user.setConnection(connection)
    router.post('/users/register', frontCtrl.user.register)
    router.post('/users/login', frontCtrl.user.login)
    router.post('/users/verifyemail', frontCtrl.user.verifyemail)
    router.post('/users/get_email_by_socket_id', frontCtrl.user.getEmailBySocketId)
    router.post('/users/is_active', frontCtrl.user.getActivestatus)
    router.post('/users/verify', frontCtrl.user.codeVerify)
    router.post('/users/getLogintoken', frontCtrl.user.getLogintoken)
    router.post('/users/googleOAuth', frontCtrl.user.googleOAuth)
    router.post('/users/contact', frontCtrl.user.contact)
    router.post('/users/get_balance', frontCtrl.user.getBalance)
    router.post('/users/get_email_by_id', frontCtrl.user.getEmailById)

    frontCtrl.product.setConnection(connection)
        //Config multer upload---//
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/products')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    });
    var upload = multer({ storage: storage });
    //-----------------------//
    router.get('/products/all', frontCtrl.product.listUrlFiles);
    router.get('/products/:filename', frontCtrl.product.downloadFile);
    router.post('/products/load', frontCtrl.product.load)
    router.post('/products/list', frontCtrl.product.list)
    router.post('/products/upload', upload.single("file"), frontCtrl.product.uploadFile);
    router.post('/products/create', frontCtrl.product.create)
    router.post('/products/bid', frontCtrl.product.bid)
    router.post('/products/review', frontCtrl.product.review)
    router.post('/products/getReviews', frontCtrl.product.reviewList)
    router.post('/products/categorylist', frontCtrl.product.categorylist)
    router.post('/products/getBidder', frontCtrl.product.getBidder)
    router.post('/products/getRecentlyViewedProduct', frontCtrl.product.getRecentlyViewedProduct)
    router.post('/products/getByCategory', frontCtrl.product.getProductsByCategory)
    router.post('/products/drafts', frontCtrl.product.getDrafts)
    router.post('/products/detail', frontCtrl.product.getTemplateDetail)
    router.post('/products/addCompare', frontCtrl.product.addCompare)
    router.post('/products/addWishList', frontCtrl.product.addWishList)
    router.post('/products/addCart', frontCtrl.product.addCart)
    router.post('/products/getCart', frontCtrl.product.getCartList)
    router.post('/products/removeCart', frontCtrl.product.removeCart)
    router.post('/products/clearCart', frontCtrl.product.clearCart)
    router.post('/products/placeOrder', frontCtrl.product.placeOrder)
    router.post('/products/getOrderList', frontCtrl.product.getOrderList)
    router.post('/products/getImages', frontCtrl.product.getImages)
    router.post('/products/discount', frontCtrl.product.discount)
    router.post('/products/getDiscount', frontCtrl.product.getDiscountInfo)
    router.post('/products/removeDiscount', frontCtrl.product.removeDiscount);
    router.post('/products/updateDiscount', frontCtrl.product.updateDiscount);
    router.post('/products/getByTitle', frontCtrl.product.getByTitle);
    router.post('/products/getByMinPriceAndQuantity', frontCtrl.product.getProductListByMinimumPriceAndQuantity); // add by michael
    router.post('/products/getBySaleEventSearch', frontCtrl.product.getSaleEventSearchResult); // add by michael
    router.put('/products', frontCtrl.product.update);
    router.delete('/products/:id', frontCtrl.product.delete)

    frontCtrl.productCategory.setConnection(connection)
    router.get('/productCategories/list', frontCtrl.productCategory.list)

    frontCtrl.productCondition.setConnection(connection)
    router.get('/productConditions', frontCtrl.productCondition.list)
    router.post('/productConditions', frontCtrl.productCondition.create)

    frontCtrl.currency.setConnection(connection);
    router.get('/currencies', frontCtrl.currency.list)
    router.get('/currencies/:id', frontCtrl.currency.load)

    frontCtrl.contact.setConnection(connection)
    router.post('/contacts/get', frontCtrl.contact.getContacts)
    router.post('/contacts/send', frontCtrl.contact.send)
    router.post('/contacts/accept', frontCtrl.contact.accept)
    router.post('/contacts/reject', frontCtrl.contact.reject)
    router.post('/contacts/incoming', frontCtrl.contact.incoming) // add by Michael
    router.post('/contacts/incoming/accept', frontCtrl.contact.acceptIncoming) // add by Michael
    router.post('/contacts/incoming/reject', frontCtrl.contact.rejectIncoming) // add by Michael

    router.post('/user_info', frontCtrl.user.getUser)
    router.post('/update_user', frontCtrl.user.updateUser)
    router.post('/check_password', frontCtrl.user.checkCanUpdatePassword)

    frontCtrl.message.setConnection(connection);
    router.post('/message/list', frontCtrl.message.getList);
    router.post('/message/delete', frontCtrl.message.delete);
    router.post('/message/send', frontCtrl.message.send);
    router.post('/message/get_message_by_id', frontCtrl.message.getMessageInfoById);
    router.post('/message/bids', frontCtrl.message.getBids); // add by michael

    // frontCtrl.chatHistory.setConnection(connection)
    // router.post('/chatHistories/add', frontCtrl.chatHistory.add)
    router.post('/products/feedback', frontCtrl.product.getFeedback);

    frontCtrl.chatHistory.setConnection(connection)
    router.post('/chatHistories/add', frontCtrl.chatHistory.add)

    frontCtrl.sellerHub.setConnection(connection);
    router.post('/seller_hub/get_overview_info', frontCtrl.sellerHub.getOverViewInfo);
    router.post('/seller_hub/get_sales_statistics_info', frontCtrl.sellerHub.getSaleStatisticsInfo);
    router.post('/seller_hub/get_order_list', frontCtrl.sellerHub.getOrderList);
    router.post('/seller_hub/get_active_product', frontCtrl.sellerHub.getActiveProductList);
    router.post('/seller_hub/get_unsold_product', frontCtrl.sellerHub.getUnSoldProductList);
    router.post('/seller_hub/get_private_product', frontCtrl.sellerHub.getPrivateProductList);
    router.post('/seller_hub/get_sales_graph_info', frontCtrl.sellerHub.getSalesGraphInfo);
    router.post('/seller_hub/update_order_status', frontCtrl.sellerHub.updateOrderStatus);
    router.post('/seller_hub/remain_order_feedback', frontCtrl.sellerHub.remainOrderFeedback);
    router.post('/seller_hub/get_feedback', frontCtrl.sellerHub.getFeedback);
    router.post('/seller_hub/bid_list', frontCtrl.sellerHub.getBidList); // add by michael

    frontCtrl.color.setConnection(connection);
    router.post('/colors/add', frontCtrl.color.add);
    router.get('/colors', frontCtrl.color.list);

    frontCtrl.promotion.setConnection(connection);
    router.get('/promotions/getOrderDiscountImages', frontCtrl.promotion.getOrderDiscountImages);
    var storage_orderDiscount = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/promotions/orderDiscount')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    });
    var upload_orderDiscount = multer({ storage: storage_orderDiscount });

    router.post('/promotions/order_discount_upload', upload_orderDiscount.single("file"), frontCtrl.promotion.uploadOrderDiscount);
    router.post('/promotions/addOrderDiscount', frontCtrl.promotion.addOrderDiscount);
    router.post('/promotions/launch_volume_pricing', frontCtrl.promotion.launchVolumePricing); // added by Jack
    router.post('/promotions/addShipDiscount', frontCtrl.promotion.addShipDiscount); // add by michael
    router.post('/promotions/addSaleEvent', frontCtrl.promotion.addSaleEvent); // add by michael
    var storage_shippingDiscount = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/promotions/shippingDiscount')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    });
    var upload_shippingDiscount = multer({ storage: storage_shippingDiscount });

    router.post('/promotions/shipping_discount_upload', upload_shippingDiscount.single("file"), frontCtrl.promotion.uploadShippingDiscount);

    var storage_saleEvent = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/promotions/saleEvent')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    });
    var upload_saleEvent = multer({ storage: storage_saleEvent });

    router.post('/promotions/sale_event_upload', upload_saleEvent.single("file"), frontCtrl.promotion.uploadSaleEvent);
    router.get('/promotions/getSaleEventImages', frontCtrl.promotion.getSaleEventImages);

    return router;

}