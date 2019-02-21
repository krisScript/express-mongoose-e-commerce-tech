const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  cart:  {
    products:[
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.products.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartProducts = [...this.cart.products];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.products[cartProductIndex].quantity + 1;
    updatedCartProducts[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartProducts.push({
      productId: product._id,
      quantity: newQuantity
    });
  }
  const updatedCart = {
    products: updatedCartProducts
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function(productId) {
  console.log(productId,this.cart)
  const updatedCartProducts = this.cart.products.filter(product => {
    return product._id.toString() !== productId.toString();
  });
  console.log(updatedCartProducts,'nani')
  this.cart.products = updatedCartProducts;
  return this.save();
};

userSchema.methods.clearCart = function() {
  this.cart = { product: [] };
  return this.save();
};


const User = mongoose.model('User', userSchema);


module.exports = User
