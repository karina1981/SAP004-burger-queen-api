"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      tableName: "users",
    }
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Request);
  };
  return User;
};
