const e = require("cors");

module.exports = function (app, db) {
  app.post("/shifts", (req, res) => {
    const { clockIn, clockOut, employeeId, description } = req.body;

    db.shift
      .create({
        clockIn,
        clockOut,
        employeeId,
        description,
      })
      .then((shift) => {
        res.status(201).json({ shift });
      })
      .catch(() => {
        res.status(400).json({ error: "Failed to create shift" });
      });
  });

  app.put("/shifts", (req, res) => {
    const { clockIn, clockOut, description, id } = req.body;

    db.shift
      .update(
        {
          clockIn,
          clockOut,
          description,
        },
        { where: { id } }
      )
      .then((shift) => {
        res.status(204).json({ shift });
      })
      .catch((e) => {
        res.status(500).json({ error: "Failed to update shift" });
      });
  });

  app.delete("/shifts/:id", (req, res) => {
    const { id } = req.params;
    if (!+id) {
      res.status(400).json({ success: false });
      return;
    }
    db.shift
      .destroy({ where: { id } })
      .then((deleteCount) => {
        if (deleteCount) {
          res.status(200).json({ success: true });
        } else {
          res.status(404).json({ error: "Shift not found" });
        }
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to delete shift" });
      });
  });

  app.get("/shifts", async (req, res) => {
    const { employeeId, offset, limit, from, to } = req.query;
    if (!employeeId) {
      return res.status(400).json({ error: "Missing employee id" });
    }

    const where = {};
    if (from) {
      where.clockIn = {
        [db.Sequelize.Op.gte]: from,
      };
    }
    if (to) {
      where.clockOut = {
        [db.Sequelize.Op.lte]: to,
      };
    }

    db.shift
      .findAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "employeeId", "description", "clockIn", "clockOut"],
        where: {
          employeeId,
          ...where,
        },
      })
      .then((shifts) => {
        res.json({ shifts });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ error: "Failed to fetch shifts" });
      });
  });
};
