const express = require('express');
const isAdmin = require('../util/isAdmin');
const { body } = require('express-validator/check');
const router = express.Router();
const Product = require('../models/product');
const adminController = require('../controllers/admin');
router.get('/products', isAdmin, adminController.getProducts);
router.get('/add-product', isAdmin, adminController.getAddProduct);
router.delete('/delete-product/:productId', isAdmin, adminController.deleteProduct);

router.get('/edit-product/:productId',isAdmin,adminController.getEditProduct)
router.post('/edit-product',isAdmin,adminController.postEditProduct)
router.post(
  '/add-product',
  [
    body(
      'name',
      ' Name should be atlest 4 characters long and should be alphanumeric'
    )
      .isLength({ min: 4 })
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
      'price',
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
      .isString()
      .escape()
      .trim(),
    body('gpu', 'GPU descruption should be longer than 10 characters.')
      .isLength({ min: 10 })
      .isString()
      .escape()
      .trim(),
    body(
      'ram',
      'RAM value should be even number bigger than 4 and smaller than 32.'
    )
      .isString()
      .escape()
      .trim(),
    body('memoryType', 'Memory type should be either SSD or HDD.')
      .isLength({ min: 3, max: 3 })
      .isAlpha()
      .isString()
      .escape()
      .trim(),
      body('capacity', 'Memory capacity  should be either  smaller than 1000 and biggner than 250')
      .isLength({ min: 3, max: 4 })
      .isNumeric()
      .isString()
      .escape()
      .trim(),
      body('batteryLife', 'Description of battery life')
      .isLength({ min: 1, max:2  })
      .isString()
      .escape()
      .trim(),
      body('description', 'Description must be atleast 30 and maximum 200 characters long')
      .isLength({ min: 30, max:1000  })
      .isString()
      .escape()
      .trim(),
      body('os', 'Os is shit')
      .isLength({ min: 6, max:10  })
      .isString()
      .escape()
      .trim()
  ],
  isAdmin,
  adminController.postAddProduct
);
module.exports = router;
