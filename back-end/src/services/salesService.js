const db = require('../database/models');

const salesService = {

  
  createSale: async ({ sellerId, userId, totalPrice, deliveryAddress, deliveryNumber }) => {
    const sale = await db.Sale.create({ sellerId, userId, totalPrice, deliveryAddress, deliveryNumber, status: 'Pendente' });
    return sale;
  },

  createSalesProduct: async (products, saleId) => {
    products.map(async (product) => {
      const { productId, quantity } = product;
      await db.SalesProduct.create({ saleId, productId, quantity });
    });
  },
};

module.exports = salesService;