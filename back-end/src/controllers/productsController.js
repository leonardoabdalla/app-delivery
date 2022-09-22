const productsService = require('../services/productsService');

const productsController = {
  list: async (_req, res) => {
    const products = await productsService.list();

    res.status(200).json(products);
  },
};

module.exports = productsController;