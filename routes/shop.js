const express = require('express')
const router = express.Router();
const isAuth = require('../util/isAuth')

const shopController  = require('../controllers/shop')
router.get('/shop', shopController.getShop);
router.get('/product/:productId', shopController.getProduct);
router.get('/add-to-cart/:productId',isAuth, shopController.postAddToCart);
router.get('/cart',isAuth, shopController.getCart);
router.get('/cart/remove-product/:productId',isAuth, shopController.getRemoveProductFromCart);
module.exports = router;
