module.exports = function(sequelize, DataTypes) {
  var Resource = sequelize.define("Resource", {
    link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Resource.associate = function(models) {
    Resource.belongsTo(models.Program, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Resource;
};
