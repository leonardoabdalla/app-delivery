const createSalesProducts = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    sale_id: { type: DataTypes.INTEGER, primaryKey: true },
    product_id: { type: DataTypes.INTEGER, primaryKey: true },
    quantity: DataTypes.INTEGER,
    
  }, {
    tableName: 'sales_products',
    underscored: true,
    timestamps: false,
  });

  SalesProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      foreignKey: 'saleId',
      otherKey: 'productId',
      through: SalesProduct,
      as: 'products',
    });

    models.Product.belongsToMany(models.Sale, {
      foreignKey: 'productId',
      otherKey: 'saleId',
      through: SalesProduct,
      as: 'sales',
    });
  };
  
  return SalesProduct;
};

module.exports = createSalesProducts;
