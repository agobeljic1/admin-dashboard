module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Shift",
    {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
      },
      employeeId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        references: {
          model: "Employee",
          key: "id",
        },
      },
      clockIn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      clockOut: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "Shift",
    }
  );
};
