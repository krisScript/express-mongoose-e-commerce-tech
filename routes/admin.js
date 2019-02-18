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
      .isLength({ min: 2, max: 4 })
      .isAlpha()
      .isString()
      .escape()
      .trim(),
    body(
      'Price',
      ' Brand should be atlest 2 characters long and should be alphabetic'
    )
      .isLength({ min: 3, max: 4 })
      .isNumeric()
      .isString()
      .escape()
      .trim(),
    body('availableUnits', ' Available units shpuld be biggner than 1')
      .isLength({ min: 1, max: 4 })
      .isNumeric()
      .isString()
      .escape()
      .trim(),
    body('screenSize', 'Screen size should be bigger than 12 inches')
      .isLength({ min: 2, max: 2 })
      .isNumeric()
      .isString()
      .escape()
      .trim(),
    body('cpu', 'CPU descruption should be longer than 10 characters.')
      .isLength({ min: 10 })
      .isAlphanumeric()
      .isString()
      .escape()
      .trim(),
    body('gpu', 'GPU descruption should be longer than 10 characters.')
      .isLength({ min: 10 })
      .isAlphanumeric()
      .isString()
      .escape()
      .trim(),
    body(
      'ram',
      'RAM value should be even number bigger than 4 and smaller than 32.'
    )
      .isLength({ min: 1, max: 2 })
      .isNumeric()
      .isString()
      .escape()
      .trim()
      .custom((ram, { req }) => {
        if (ram % 2 !== 0 || ram > 32 || ram < 4) {
          return Promise.reject('RAM Value is invalid');
        }
      }),
    body('memoryType', 'Memory type should be either SSD or HDD.')
      .isLength({ min: 3, max: 3 })
      .isAlpha()
      .isString()
      .escape()
      .trim()
      .custom((memoryType, { req }) => {
          if (memoryType !== "ssd" || memoryType !== "hdd" ) {
            return Promise.reject('Memory Type value is invalid');
          }
      }),
      body('capacity', 'Memory capacity  should be either  smaller than 1000 and biggner than 250')
      .isLength({ min: 3, max: 4 })
      .isNumeric()
      .isString()
      .escape()
      .trim()
      .custom((capacity, { req }) => {
          if (capacity > 1000 || capacity < 250) {
            return Promise.reject('Capacity  value is invalid');
          }
      }),
      body('batteryLifre', 'Description of battery life')
      .isLength({ min: 1, max:2  })
      .isAlpha()
      .isString()
      .escape()
      .trim(),
      body('description', 'Description must be atleast 30 characters')
      .isLength({ min: 1, max:2  })
      .isAlphanumeric()
      .isString()
      .escape()
      .trim()
  ],
  isAdmin,
  adminController.postAddProduct
);
module.exports = router;
