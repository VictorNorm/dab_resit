var express = require("express");
var router = express.Router();
const { QueryTypes } = require("sequelize");
var db = require("../models");
var onlyAdminUsers = require("../middleware/onlyAdminUsers");
const { Sequelize, sequelize } = require("../models");
var ColourService = require("../services/ColourService");
var colourService = new ColourService(db);

router.get("/", async function (req, res, next) {
  try {
    const colours = await colourService.getAll();
    res.render("colours", { user: req.user, colours: colours });
  } catch (error) {
    console.error(error);
    res.status(500).send("There was a problem retrieving the data");
  }
});

router.post("/add", onlyAdminUsers, async function (req, res, next) {
  const { colour } = req.body;

  await colourService.create(colour);

  res.json({ status: "success", message: "Colour created successfully" });
});

router.put("/update", onlyAdminUsers, async function (req, res, next) {
  const { id, colour } = req.body;
  try {
    await colourService.update(colour, id);
    res.json({ status: "success", message: "Colour updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("An unexpected error ocurred");
  }
});

router.delete("/delete/:id", onlyAdminUsers, async function (req, res, next) {
  const colourId = req.params.id;

  const sql = `SELECT * FROM vehicle_colours WHERE ColourId = :colourId LIMIT 1`;
  const result = await db.sequelize.query(sql, {
    replacements: { colourId: colourId },
    type: db.sequelize.QueryTypes.SELECT,
  });

  if (result && result.length > 0) {
    res.status(403).json({
      error:
        "You cannot delete a colour that is associated with existing vehicles.",
    });
  } else {
    await colourService.delete(colourId);
    res.json({ status: "success", message: "Colour deleted successfully" });
  }
});

module.exports = router;
