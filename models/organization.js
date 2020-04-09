'use strict';
module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    name: DataTypes.STRING,
    UserId: DataTypes.BIGINT,
    TaskId: DataTypes.INTEGER
  }, {});
  Organization.associate = function(models) {
    // associations can be defined here
    Organization.belongsTo(models.User);
    Organization.belongsTo(models.Task);
  };
  return Organization;
};