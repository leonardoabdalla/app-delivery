const salesService = require('../services/salesService');
const userService = require('../services/userService');

const salesController = {
  create: async (req, res) => {
    const { userEmail, totalPrice, deliveryAddress, deliveryNumber, products, sellerName } = req.body;
    const { id: sellerId } = await userService.getByName(sellerName);
    const { id: userId } = await userService.getByEmail(userEmail);
    const { id: saleId } = await salesService.createSale({ sellerId, userId, totalPrice, deliveryAddress, deliveryNumber });
    await salesService.createSalesProduct(products, saleId);

    res.status(201).json({ saleId });
  },
};

module.exports = salesController;