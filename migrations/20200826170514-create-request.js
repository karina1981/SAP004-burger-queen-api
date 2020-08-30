"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("requests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // user_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: "users",
      //     key: "id",
      //   },
      //   onUpdate: "CASCADE",
      //   onDelete: "SET NULL",
      // },
      tableNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      clientName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      totalValue: {
        allowNull: false,
        type: Sequelize.DECIMAL(12, 2),
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      endDate: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("requests");
  },
};
