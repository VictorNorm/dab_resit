module.exports = (sequelize, Sequelize) => {
  const Colour = sequelize.define(
    "Colour",
    {
      name: Sequelize.DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
  Colour.associate = function (models) {
    Colour.belongsToMany(models.Vehicle, { through: "vehicle_colours" });
  };
  return Colour;
};
