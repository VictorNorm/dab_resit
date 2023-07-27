module.exports = (sequelize, Sequelize) => {
  const Type = sequelize.define(
    "Type",
    {
      type: Sequelize.DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
  Type.associate = function (models) {
    Type.belongsToMany(models.Vehicle, { through: "vehicle_types" });
  };
  return Type;
};
