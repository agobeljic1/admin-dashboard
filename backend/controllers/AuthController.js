var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { createAccessAndRefreshTokens } = require("../utils/Auth");

module.exports = function (app, db) {
  app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
      const hash = await bcrypt.hash(password, 10);

      const newUser = {
        username,
        password: hash,
      };
      db.user
        .create(newUser)
        .then(() => {
          res.status(201).json({ success: true });
        })
        .catch(() => {
          res.status(409).json({ error: "Failed to create the user" });
        });
    } catch {
      res.status(500).json({ error: "Unexpected error" });
    }
  });

  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
      const { dataValues: user } = await db.user.findOne({
        where: { username },
      });
      if (!user) {
        throw new Error();
      }
      const passwordsEqual = await bcrypt.compare(password, user.password);
      if (passwordsEqual) {
        const { password, ...userWithoutPassword } = user;

        const { accessToken, refreshToken } =
          createAccessAndRefreshTokens(userWithoutPassword);
        res.cookie("admindashboard", refreshToken, {
          path: "/refresh-token",
          httpOnly: true,
        });
        res.status(200).json({ accessToken });
      } else {
        res.status(401).send({ error: "Password not valid" });
      }
    } catch (e) {
      return res.status(401).json({ error: "Username not valid" });
    }
  });

  app.get("/refresh-token", async (req, res) => {
    const refreshToken = req.cookies?.admindashboard;
    if (!refreshToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, jwtUser) => {
          if (err) {
            throw new Error();
          }
          const { exp, iat, ...user } = jwtUser;
          const { accessToken, refreshToken } =
            createAccessAndRefreshTokens(user);
          res.cookie("admindashboard", refreshToken, {
            path: "/refresh-token",
            httpOnly: true,
          });
          res.status(200).json({ accessToken });
        }
      );
    } catch (e) {
      return res.status(401).json({ error: "Failed to create token" });
    }
  });

  app.post("/logout", async (req, res) => {
    res.clearCookie("admindashboard", {
      path: "/refresh-token",
      httpOnly: true,
    });
    return res.status(200).json({ success: true });
  });
};
