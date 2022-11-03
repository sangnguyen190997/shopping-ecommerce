'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idProduct: {
        type: Sequelize.STRING
      },
      idUser: {
        type: Sequelize.STRING
      },
      fullname: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      star1: {
        type: Sequelize.STRING
      },
      star2: {
        type: Sequelize.STRING
      },
      star3: {
        type: Sequelize.STRING
      },
      star4: {
        type: Sequelize.STRING
      },
      star5: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};