const Product = require('../models/product');
const User = require('../models/user')
const getCartData = require('../util/getCartData')
exports.getShop = async (req, res, next) => {
  try {
    const { brand } = req.query;
    let products;
    if (brand) {
        console.log(brand)
      products = await Product.find({brand});
      console.log(products)
    } else {
      products = await Product.find();
    }

    res.render('shop/shop', {
      products,
      title: 'Shop',
      path: '/shop',
      errorMessage: false
    });
  } catch (err) {}
};
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
        specName !== 'availableUnits' &&
        specName !== 'price'
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
}

exports.postAddToCart = async (req,res,next) => {
    try{
      const {productId} = req.params
      const authUserId = req.user._id
      const product = await Product.findById(productId)
      const user = await User.findById(authUserId)
      await user.addToCart(product)
      res.redirect('/cart')
    }catch(err){
        console.log(err)
    }
}


exports.getCart  = async (req,res,next) => {
  try{
    const {user} = req
    const cartData = await getCartData(user)
    const {products,productsInCart,price,tax,totalPrice} = cartData
    res.render('shop/cart', {
      totalPrice,
      price,
      tax,
      productsInCart,
      products,
      title:'Cart',
      path: 'cart',
      errorMessage: false
    });
  }catch(err){
      console.log(err)
  }
}
exports.getRemoveProductFromCart = async (req,res,next) => {
  try{
   const {user} = req
    const {productId} = req.params
    await user.removeFromCart(productId)
    const cartData = await getCartData(user)
    const {products,productsInCart,price,tax,totalPrice} = cartData
    res.status(200).json({ msg: 'product removed',productsInCart,tax,price,totalPrice });
  }catch(err){
      console.log(err)
  }
}