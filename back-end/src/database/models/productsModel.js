const createProduct = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING(100),
    price: DataTypes.DECIMAL(4, 2),
    urlImage: DataTypes.STRING(200),
  }, {
    tableName: 'products',
    underscored: true,
    timestamps: false,
  });

  Product.associate = (models) => {
    models.Product.hasMany(models.SalesProduct, 
      { foreignKey: 'product_id', as: 'sale_product'},
    );
  };

  return Product;
};

module.exports = createProduct;
