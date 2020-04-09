'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: 
      {
        type : DataTypes.STRING,
        allowNull: false
      },
    category: 
      {
        type : DataTypes.STRING,
        allowNull: false
      },
    description: DataTypes.TEXT
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsToMany(models.User, {through : "Organizations"});
  };
  return Task;
};