const Product = require('../models/product');

const pagination = async (req,itemsPerPage) => {
  try {
    const page = +req.query.page || 1;
    const productsCount = await Product.find().countDocuments();
    let totalItems = productsCount;
    const products = await Product.find()
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    return {
      products,
      totalItems,
      page
    };
  } catch (err) {
    console.log(err);
  }
};

module.exports = pagination;
// const page = +req.query.page || 1;
// let totalItems;

// Product.find()
//   .countDocuments()
//   .then(numProducts => {
//     totalItems = numProducts;
//     return Product.find()
//       .skip((page - 1) * ITEMS_PER_PAGE)
//       .limit(ITEMS_PER_PAGE);
//   })
//   .then(products => {
//     res.render('shop/index', {
//       prods: products,
//       pageTitle: 'Shop',
//       path: '/',
//       currentPage: page,
//       hasNextPage: ITEMS_PER_PAGE * page < totalItems,
//       hasPreviousPage: page > 1,
//       nextPage: page + 1,
//       previousPage: page - 1,
//       lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
//     });
//   })
