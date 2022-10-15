const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    port: 3306,
    define: {
      timestamps: false,
    },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//model import
db.user = require("./User.js")(sequelize, Sequelize);
db.employee = require("./Employee.js")(sequelize, Sequelize);
db.shift = require("./Shift.js")(sequelize, Sequelize);

module.exports = db;
