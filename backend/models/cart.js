"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Product }) {
      // define association here
      Cart.belongsTo(User, { foreignKey: "idUser" });
      Cart.belongsTo(Product, { foreignKey: "idProduct" });
    }
  }
  Cart.init(
    {
      idUser: DataTypes.INTEGER,
      idProduct: DataTypes.INTEGER,
      nameProduct: DataTypes.STRING,
      priceProduct: DataTypes.STRING,
      count: DataTypes.INTEGER,
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  // Cart.sync({ alter: true });
  return Cart;
};
