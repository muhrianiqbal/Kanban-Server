'use strict';
const {encrypt} = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', 
  {
    email: 
      {
        allowNull: false,
        type : DataTypes.STRING,
        unique : true,
        validate :
        {
          isEmail : true
        }
      },
    password: 
      {
        type : DataTypes.STRING,
        allowNull: false
      },
      organization: 
      {
        type : DataTypes.STRING,
        defaultValue: "Hacktiv8"
      }
  }, 
  {
    hooks :
    {
      beforeCreate : (user, options) =>
      {
        user.password = encrypt(user.password);
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Task, {through : "Organizations"});
  };
  return User;
};