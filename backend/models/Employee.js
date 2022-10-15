module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Employee",
    {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "Employee",
    }
  );
};
