module.exports = function(sequelize, DataTypes) {
  var Program = sequelize.define("Program", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 18]
      }
    }
  });

  Program.associate = function(models) {
    Program.belongsTo(models.Client, {
      foreignKey: {
        allowNull: false
      }
    });
    Program.hasMany(models.Resource, {
      onDelete: "cascade"
    });
  };

  return Program;
};
