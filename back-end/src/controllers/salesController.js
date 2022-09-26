const salesService = require('../services/salesService');
const userService = require('../services/userService');

const salesController = {
  create: async (req, res) => {
    const { userEmail, products } = req.body;
    const { id: userId } = await userService.getByEmail(userEmail);
    const { id: saleId } = await salesService
      .createSale({ ...req.body, userId });
    await salesService.createSalesProduct(products, saleId);

    res.status(201).json({ saleId });
  },
};

module.exports = salesController;