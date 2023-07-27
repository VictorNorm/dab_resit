module.exports = (sequelize, Sequelize) => {
  const Feature = sequelize.define(
    "Feature",
    {
      feature: Sequelize.DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
  Feature.associate = function (models) {
    Feature.belongsToMany(models.Vehicle, { through: "vehicle_features" });
  };
  return Feature;
};
