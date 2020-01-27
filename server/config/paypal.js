
var paypal = require('paypal-rest-sdk');

// paypal auth configuration
var config = {
    "api" : {
        "mode" : "sandbox",
        "client_id" : "AaCJ-ZJ6PX_8jd5k1SftqWniV0BeieqSveWIvxECqyxGowuzSi7gtJRfO8zHMqMaQRSSakLMKoBRpMVh",  // your paypal application client id
        "client_secret" : "EFE6wIlsmLCL8la3CtH72cOuq8HhpQ27F9rSvbWE-Vy4rouqA3ipayxPvPT1L6YVCSxyytm2D9ZFgPjC" // your paypal application secret id
    }
};

paypal.configure(config.api);
module.exports = paypal;