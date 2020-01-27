var express = require('express');
var router = express.Router();

var adminCtrl = require('../../../app/controllers/admin');

router.post('/', adminCtrl.home.index);

module.exports = router



