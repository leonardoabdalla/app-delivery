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
        references: {
          model: 'users',
          key: 'id',
        },
      },
      
      sellerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },

      totalPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL(9, 2),

      },
      deliveryAddress: {
        allowNull: false,
        type: Sequelize.STRING(100),

      },
    
      deliveryNumber: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },

      saleDate: {
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
