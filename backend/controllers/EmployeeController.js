module.exports = function (app, db) {
  app.post("/employees", (req, res) => {
    const { name, birthDate, address } = req.body;

    db.employee
      .create({
        name,
        birthDate,
        address,
      })
      .then((employee) => {
        res.status(201).json({ employee });
      })
      .catch(() => {
        res.status(400).json({ error: "Failed to create employee" });
      });
  });

  app.put("/employees", (req, res) => {
    const { id, name, birthDate, address } = req.body;

    db.food
      .update(
        {
          name,
          birthDate,
          address,
        },
        { where: { id } }
      )
      .then((employee) => {
        res.status(204).json({ employee });
      })
      .catch((e) => {
        res.status(500).json({ error: "Failed to update employee" });
      });
  });

  app.delete("/employees/:id", (req, res) => {
    const { id } = req.params;
    if (!+id) {
      res.status(400).json({ success: false });
      return;
    }
    db.employee
      .destroy({ where: { id } })
      .then((deleteCount) => {
        if (deleteCount) {
          res.status(200).json({ success: true });
        } else {
          res.status(404).json({ error: "Employee not found" });
        }
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to delete employee" });
      });
  });

  app.get("/employees", async (req, res) => {
    const { offset, limit } = req.query;

    db.employee
      .findAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "name", "birthDate", "address"],
      })
      .then((employees) => {
        res.json({ employees });
      })
      .catch((e) => {
        res.status(500).json({ error: "Failed to fetch employees" });
      });
  });
};
