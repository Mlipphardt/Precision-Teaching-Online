module.exports = function(sequelize, DataTypes) {
  var Client = sequelize.define("Client", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 2]
      }
    }
  });

  Client.associate = function(models) {
    Client.hasMany(models.Program, {
      onDelete: "cascade"
    });
  };

  return Client;
};
