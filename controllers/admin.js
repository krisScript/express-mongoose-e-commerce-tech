const Product = require('../models/product');
const { validationResult } = require('express-validator/check');
exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    title: 'Add Product',
    path: '/admin/add-product',
    errorMessage: false,
    validationErrors: [],
    oldInput: {
      name : '',
      brand : '',
      price : '',
      availableUnits: '',
      screenSize : '',
      cpu: '',
      gpu: '',
      ram: '',
      memory: '',
      description: '',
      os:''
    }
  });
};
exports.postAddProduct = async (req, res, next) => {
  try {
 

    const imageFile = req.file;
    const imageUrl = imageFile.path;

    const errors = validationResult(req);
    const {
      name,
      brand,
      price,
      availableUnits,
      screenSize,
      cpu,
      gpu,
      ram,
      batteryLife,
      memoryType,
      capacity,
      description,
      os
    } = req.body;
    if (!imageFile) {
      fileDelete(imageUrl);
      return res.status(422).render('admin/add-product', {
        title: 'Add Product',
        path: 'admin/add-product',
        errorMessage: 'Attached file is not an image.',
        validationErrors: []
      });
    }
    if (!errors.isEmpty()) {
      fileDelete(imageUrl);
      return res.status(422).render('admin/add-product', {
        path: 'admin/add-product',
        title: 'Add Product',
        errorMessage: errors.array()[0].msg,
        validationErrors: errors.array()
      });
    } else {
      console.log('ok')
      const memory = {
        capacity,
        memoryType
      };
      const product = new Product({
        name,
        brand,
        price,
        availableUnits,
        screenSize,
        cpu,
        gpu,
        ram,
        memory,
        description,
        os,
        batteryLife,
        imageUrl
      });

      await product.save();
      res.redirect(`/`);
    }
  } catch (err) {
    console.log(err)
  }
};
