const db = require('../database/models');

const salesService = {
  getAllProducts: async (products, sale) => {
    // products: [...{product_id, quantity}]
    // salesUser: [...{id, userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status}]
    // create salesProduct: { sale_id: id(salesUser), product_id, quantity}
    await products.map((product) => {
        db.SalesProduct.create(product + sale.id);
    }); 
  },

  create: async ({ userId, totalPrice, deliveryAddress, deliveryNumber }) => {
    const sales = await db.Sales.create({ userId, totalPrice, deliveryAddress, deliveryNumber });
    return sales;
  },
};

module.exports = salesService;
