const express = require('express');
const isAdmin = require('../util/isAdmin');
const { body } = require('express-validator/check');
const router = express.Router();
const Product = require('../models/product');
const adminController = require('../controllers/admin');
router.get('/add-product', isAdmin, adminController.getAddProduct);
router.post(
  '/add-product',
  [
    body(
      'name',
      ' Name should be atlest 4 characters long and should be alphanumeric'
    )
      .isLength({ min: 4 })
      .isAlphanumeric()
      .isString()
      .escape()
      .trim()
      .custom((name, { req }) => {
        return Product.findOne({ name }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('Product already exists');
          }
        });
      }),
      body(
        'brand',
        ' Brand should be min 2 and max 4 characters long and should be alphabetic'
      )
        .isLength({ min: 2,max: 4 })
        .isAlpha()
        .isString()
        .escape()
        .trim(),
        body(
            'Price',
            ' Brand should be atlest 2 characters long and should be alphabetic'
          )
            .isLength({ min: 3,max : 4 })
            .isNumberic()
            .isString()
            .escape()
            .trim(),
            body(
                'availableUnits',
                ' Available units shpuld be biggner than 1'
              )
                .isLength({ min: 1,max : 4 })
                .isNumberic()
                .isString()
                .escape()
                .trim()
  ],
  isAdmin,
  adminController.postAddProduct
);
module.exports = router;
