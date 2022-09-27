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

  list: async (req, res) => {
    const sales = await salesService.list();
    res.status(200).json(sales);
  },

  getByUserEmail: async (req, res) => {
    const { email } = req.body;
    const { id } = await userService.getByEmail(email);
    const sales = await salesService.getByUserId(id);
    res.status(200).json(sales);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.getById(id);

    res.status(200).json(sale);
  },
};

module.exports = salesController;