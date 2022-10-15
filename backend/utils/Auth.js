const jwt = require("jsonwebtoken");

module.exports.verifyTokenAndSetUser = function (req, res, next) {
  const authorizationHeader = req.headers?.authorization;
  const token = authorizationHeader && authorizationHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  });
};

module.exports.createAccessAndRefreshTokens = function (user) {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};
