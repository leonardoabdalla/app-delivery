const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: false,
  });

  User.associate = (models) => {
    models.User.hasMany(models.Sale, 
      { foreignKey: 'user_id', as: 'client_sales'},
      { foreignKey: 'seller_id', as: 'seller_sales'}
    );
  };

  return User;
};

module.exports = createUser;
