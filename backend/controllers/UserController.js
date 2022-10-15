module.exports = function (app, db) {
  app.get("/me", async (req, res) => {
    const { exp, iat, ...user } = req.user;
    res.status(200).json({ user });
  });
};
