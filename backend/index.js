require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./models/db.js");
const port = process.env.PORT || 8000;
db.sequelize
  .sync()
  .then(() => {
    console.log("Successfully connected with the database");
  })
  .catch((err) => {
    console.log("Failed to connect with the database");
    console.error(err);
  });

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const { verifyTokenAndSetUser } = require("./utils/Auth.js");

require("./controllers/AuthController.js")(app, db);
app.use(verifyTokenAndSetUser);
require("./controllers/EmployeeController.js")(app, db);
require("./controllers/ShiftController.js")(app, db);

app.listen(port, () => {
  console.log("server successfully started on port " + port);
});
