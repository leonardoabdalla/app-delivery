'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: { 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      
      userId: {
        allowNull: false, 
        type: Sequelize.INTEGER,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      
      sellerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'seller_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },

      totalPrice: {
        allowNull: false,
        field: 'total_price',
        type: Sequelize.DECIMAL(9, 2),

      },
      deliveryAddress: {
        field: 'delivery_address',
        allowNull: false,
        type: Sequelize.STRING(100),

      },
    
      deliveryNumber: {
        field: 'delivery_number',
        allowNull: false,
        type: Sequelize.STRING(50),
      },

      saleDate: {
        field: 'sale_date',
        allowNull: false,
        type: Sequelize.DATE,
      },

      status: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};
