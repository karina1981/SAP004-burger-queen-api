"use strict";
module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define(
    "Request",
    {
      tableNumber: DataTypes.STRING,
      clientName: DataTypes.STRING,
      totalValue: DataTypes.DECIMAL(12, 2),
      startDate: DataTypes.DATE,
    },
    {
      tableName: "requests",
    }
  );
  Request.associate = function (models) {
    // associations can be defined here
    // Request.belongsTo(models.User);
    Request.hasMany(models.RequestItem);
  };
  return Request;
};
