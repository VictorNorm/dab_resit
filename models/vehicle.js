module.exports = (sequelize, Sequelize) => {
  const Vehicle = sequelize.define(
    "Vehicle",
    {
      registration: Sequelize.DataTypes.INTEGER,
      make: Sequelize.DataTypes.STRING,
      model: Sequelize.DataTypes.STRING,
      rented: Sequelize.DataTypes.BOOLEAN,
      lastServiceDate: Sequelize.DataTypes.DATE,
    },
    {
      timestamps: false,
    }
  );
  Vehicle.associate = function (models) {
    Vehicle.belongsToMany(models.Feature, { through: "vehicle_features" });
    Vehicle.belongsToMany(models.Colour, { through: "vehicle_colours" });
    Vehicle.belongsToMany(models.Type, { through: "vehicle_types" });
    Vehicle.belongsToMany(models.User, { through: "user_vehicles" });
  };
  return Vehicle;
};
