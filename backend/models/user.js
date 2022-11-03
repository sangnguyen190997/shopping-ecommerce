"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Cart, Comment, History, Messenger, Converstation }) {
      User.hasOne(Cart, {
        foreignKey: "idUser",
        as: "cart",
      });
      User.hasOne(Comment, {
        foreignKey: "idUser",
        as: "comment",
      });
      User.hasOne(History, {
        foreignKey: "idUser",
        as: "history",
      });
      User.hasMany(Messenger, { foreignKey: "senderId", as: "sender" });
      User.hasMany(Messenger, { foreignKey: "receiverId", as: "receiver" });
      // User.hasOne(Converstation, { foreignKey: "user1Id", as: "creator" });
      // User.hasOne(Converstation, { foreignKey: "user2Id", as: "recipient" });
    }
  }
  User.init(
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 6,
          max: 30,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          min: 10,
          max: 50,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 6,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]+$/,
        },
      },
      admin: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  // User.sync({ alter: true });
  return User;
};
