const getCartData = async user => {
    await user.populate('cart.products.productId').execPopulate()
    const {products} = user.cart
    const productsInCart = products.length
    const priceCalcArray = products.map(product => {
      return product.quantity * product.productId.price
    })
    const  price = priceCalcArray.reduce((a, b) =>    a + b , 0);
    const taxPerc = 10
    const tax =  taxPerc *(price/100)
    const totalPrice = tax + price
    return {
      products,
        productsInCart,
        price,tax,
        totalPrice
    }
}
module.exports = getCartData