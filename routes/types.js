var express = require("express");
var router = express.Router();
var db = require("../models");
var onlyAdminUsers = require("../middleware/onlyAdminUsers");
const { Sequelize, sequelize } = require("../models");
var TypeService = require("../services/TypeService");
var typeService = new TypeService(db);
// var VehicleService = require("../services/VehicleService");
// var vehicleService = new VehicleService(db);
const { QueryTypes } = require("sequelize");

router.get("/", async function (req, res, next) {
  const types = await typeService.getAll();

  res.render("types", { user: req.user, types: types });
});

router.put("/update", onlyAdminUsers, async function (req, res, next) {
  const { id, type } = req.body;
  console.log(id, type);
  console.log(req.user);

  await typeService.update(type, id);

  res.json({ status: "success", message: "Type updated successfully" });
});

router.post("/add", onlyAdminUsers, async function (req, res, next) {
  const { type } = req.body;

  await typeService.create(type);

  res.json({ status: "success", message: "Type created successfully" });
});

router.delete("/delete/:id", onlyAdminUsers, async function (req, res, next) {
  const typeId = req.params.id;

  const sql = `SELECT * FROM vehicle_types WHERE TypeId = :typeId LIMIT 1`;
  const result = await db.sequelize.query(sql, {
    replacements: { typeId: typeId },
    type: QueryTypes.SELECT,
  });

  if (result && result.length > 0) {
    res
      .status(403)
      .json({ error: "You cannot delete an existing type of vehicle." });
  } else {
    await typeService.delete(typeId);
    res.json({ status: "success", message: "Type deleted successfully" });
  }
});

module.exports = router;
