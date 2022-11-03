"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      History.belongsTo(User, { foreignKey: "idUser" });
    }
  }
  History.init(
    {
      idUser: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      cart: DataTypes.INTEGER,
      fullname: DataTypes.STRING,
      total: DataTypes.STRING,
      status: {
        type: DataTypes.TINYINT,
        defaultValue: false,
      },
      delivery: {
        type: DataTypes.TINYINT,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "History",
    }
  );
  // History.sync({ alter: true });
  return History;
};
