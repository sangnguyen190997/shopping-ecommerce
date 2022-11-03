"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Converstation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Messenger, User }) {
      // define association here
      // Converstation.hasMany(Messenger, { foreignKey: "idConverstation" });
      // Converstation.belongsTo(User, { foreignKey: "user1Id" });
      // Converstation.belongsTo(User, { foreignKey: "user2Id" });
    }
  }
  Converstation.init(
    {
      user1Id: DataTypes.STRING,
      user2Id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Converstation",
    }
  );
  // Converstation.sync({ alter: true });
  return Converstation;
};
