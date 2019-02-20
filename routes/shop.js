const express = require('express')
const router = express.Router();


const shopController  = require('../controllers/shop')
router.get('/shop', shopController.getShop);
router.get('/product/:productId', shopController.getProduct);
module.exports = router;
