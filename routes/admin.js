const express = require('express')
const isAdmin = require('../util/isAdmin')
const router = express.Router();


const adminController  = require('../controllers/admin')
router.get('/add-product',isAdmin, adminController.getAddProduct);

module.exports = router;
