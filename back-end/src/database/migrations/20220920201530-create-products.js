'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: { 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(100),
      },

      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(4,2),
      },
      
      url_image: {
        allowNull: false, 
        type: Sequelize.STRING(200),
        defaultValue: '',
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};