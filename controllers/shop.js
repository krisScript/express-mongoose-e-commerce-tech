const Product = require('../models/product')
exports.getShop = async (req,res,next) => {
    try{
        const products = await Product.find()
        res.render('shop/shop', {
            products,
            title:'Shop',
            path: '/shop',
            errorMessage:false,
          })
    }catch(err){
        
    }
   
}

exports.getProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);
      //Product specs with be array of arrays each containing name and value of product specifications.[[spec1:'dummy value'],[spec2:'dummy value']]
      const productSpecs = Object.entries(product._doc).map(spec => {
        const specName = spec[0];
        const specValue = spec[1];
        if (
          specName !== 'description' &&
          specName !== 'imageUrl' &&
          specName !== '_id' &&
          specName !== '__v' &&
          specName !== 'availableUnits'
        ) {
          if (specName == 'memory') {
            return [specName, `${specValue.memoryType} ${specValue.capacity}`];
          }
          return spec;
        }
      });
  
      res.render('product/product-details', {
        product,
        productSpecs,
        title: product.name,
        path: 'admin/product',
        errorMessage: false
      });
    } catch (err) {}
  };