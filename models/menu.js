"use strict";
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    "Menu",
    {
      name: DataTypes.STRING(100),
      price: DataTypes.DECIMAL(12, 2),
      category: DataTypes.STRING(100),
      type: DataTypes.STRING(40),
    },
    {
      tableName: "menus",
    }
  );
  Menu.associate = function (models) {
    // associations can be defined here
    Menu.hasMany(models.RequestItem);
  };
  return Menu;
};
