module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      fullName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username: Sequelize.DataTypes.STRING,
      password: Sequelize.DataTypes.STRING,
      role: Sequelize.DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
  User.associate = function (models) {
    User.belongsToMany(models.Vehicle, { through: "user_vehicles" });
  };
  return User;
};
