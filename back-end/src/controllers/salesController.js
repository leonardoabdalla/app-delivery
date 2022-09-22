const productsService = require('../services/salesService');

const salesController = {
  list: async (req, res) => {
    const { userId, totalPrice, deliveryAddress, deliveryNumber, products } = req.body;
    const sale = await salesService.create({ userId, totalPrice, deliveryAddress, deliveryNumber });
    const productsUser = await salesService.getAllProducts(products, sale);

    res.status(200).json(salesUser);
  }
}

module.exports = salesController;