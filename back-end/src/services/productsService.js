const db = require('../database/models');

const productsService = {
  list: async () => {
    const products = await db.Product.findAll();
    return products;
  }
};

module.exports = productsService;
