'use strict';
module.exports = function(sequelize, DataTypes) {
  var Menu = sequelize.define('Menu', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Menu;
};