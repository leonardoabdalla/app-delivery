const salesService = require('../services/salesService');

const salesController = {
  create: async (req, res) => {
    console.log(req.user);
    const { id: userId } = req.user;
    const { products, ...saleData } = req.body;
    const { id: saleId } = await salesService
      .createSale({ ...saleData, userId });
    await salesService.createSalesProduct(products, saleId);

    res.status(201).json({ saleId });
  },

  list: async (req, res) => {
    const { id, role } = req.user;
    let sales;

    switch (role) {
      case 'customer':
        sales = await salesService.getByCustomer(id);
        break;
      case 'seller':
        sales = await salesService.getBySeller(id);
        break;
      case 'administrator':
        sales = await salesService.list();
        break;
      default:
        break;
    }

    res.status(200).json(sales);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.getById(id);

    res.status(200).json(sale);
  },

  updateStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const sale = await salesService.updateStatus(id, status);

    res.status(200).json(sale);
  },
};

module.exports = salesController;