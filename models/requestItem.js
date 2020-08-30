"use strict";
module.exports = (sequelize, DataTypes) => {
  const RequestItem = sequelize.define(
    "RequestItem",
    {
      request_id: DataTypes.INTEGER,
      menu_id: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(12, 2),
    },
    {
      tableName: "request_items",
    }
  );
  RequestItem.associate = function (models) {
    // associations can be defined here
    RequestItem.belongsTo(models.Request);
    RequestItem.belongsTo(models.Menu);
  };
  return RequestItem;
};
