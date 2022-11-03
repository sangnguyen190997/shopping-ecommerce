"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Messenger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Converstation, User }) {
      // define association here
      // Messenger.belongsTo(Converstation, { foreignKey: "idConverstation" });
      Messenger.belongsTo(User, { foreignKey: "senderId" });
      Messenger.belongsTo(User, { foreignKey: "receiverId" });
    }
  }
  Messenger.init(
    {
      senderId: DataTypes.INTEGER,
      receiverId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      idConverstation: DataTypes.INTEGER,
      category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Messenger",
    }
  );
  // Messenger.sync({ alter: true });
  return Messenger;
};
