var express = require("express");
var router = express.Router();
var db = require("../models");
const { Sequelize, sequelize } = require("../models");
var VehicleService = require("../services/VehicleService");
var vehicleService = new VehicleService(db);
const { Op } = require("sequelize");
var allLoggedInUsers = require("../middleware/allLoggedInUsers");
var onlyAdminUsers = require("../middleware/onlyAdminUsers");
var onlyCustomers = require("../middleware/onlyCustomers");

router.get("/", async function (req, res, next) {
  const sql = `
  SELECT vehicles.*, ANY_VALUE(types.type) as type, GROUP_CONCAT(features.feature) as features,
  ANY_VALUE(colours.name) as colour,
  CASE WHEN DATE_ADD(lastServiceDate, INTERVAL 6 MONTH) < NOW() THEN 'false' ELSE 'true' END as serviceable
  FROM vehicles 
  JOIN vehicle_types ON vehicles.id = vehicle_types.VehicleId
  JOIN types ON vehicle_types.TypeId = types.id
  LEFT JOIN vehicle_features ON vehicles.id = vehicle_features.VehicleId 
  LEFT JOIN features ON vehicle_features.FeatureId = features.id
  LEFT JOIN vehicle_colours ON vehicles.id = vehicle_colours.VehicleId
  LEFT JOIN colours ON vehicle_colours.ColourId = colours.id
  GROUP BY vehicles.id
  `;
  const vehicles = await db.sequelize.query(sql, {
    type: db.sequelize.QueryTypes.SELECT,
  });

  res.render("vehicles", { user: req.user, vehicles: vehicles });
});

router.get("/rented", async function (req, res, next) {
  const sql = `
  SELECT vehicles.*, ANY_VALUE(types.type) as type, ANY_VALUE(colours.name) as colour, GROUP_CONCAT(features.feature) as features,
    CASE WHEN DATE_ADD(lastServiceDate, INTERVAL 6 MONTH) < NOW() THEN 'false' ELSE 'true' END as serviceable
  FROM vehicles 
  JOIN vehicle_types ON vehicles.id = vehicle_types.VehicleId
  JOIN types ON vehicle_types.TypeId = types.id
  LEFT JOIN vehicle_features ON vehicles.id = vehicle_features.VehicleId 
  LEFT JOIN features ON vehicle_features.FeatureId = features.id
  LEFT JOIN vehicle_colours ON vehicles.id = vehicle_colours.VehicleId
  LEFT JOIN colours ON vehicle_colours.ColourId = colours.id
  WHERE vehicles.rented = 1
  GROUP BY vehicles.id
  `;
  const vehicles = await db.sequelize.query(sql, {
    type: db.sequelize.QueryTypes.SELECT,
  });

  res.render("vehicles", { user: null, vehicles: vehicles });
});

router.get("/service", onlyAdminUsers, async function (req, res, next) {
  const sql = `
  SELECT vehicles.*, ANY_VALUE(types.type) as type, ANY_VALUE(colours.name) as colour, GROUP_CONCAT(features.feature) as features,
    CASE WHEN DATE_ADD(lastServiceDate, INTERVAL 6 MONTH) < NOW() THEN 'false' ELSE 'true' END as serviceable
  FROM vehicles 
  JOIN vehicle_types ON vehicles.id = vehicle_types.VehicleId
  JOIN types ON vehicle_types.TypeId = types.id
  LEFT JOIN vehicle_features ON vehicles.id = vehicle_features.VehicleId 
  LEFT JOIN features ON vehicle_features.FeatureId = features.id
  LEFT JOIN vehicle_colours ON vehicles.id = vehicle_colours.VehicleId
  LEFT JOIN colours ON vehicle_colours.ColourId = colours.id
  WHERE DATE_ADD(lastServiceDate, INTERVAL 6 MONTH) < NOW()
  GROUP BY vehicles.id
  `;
  const vehicles = await db.sequelize.query(sql, {
    type: db.sequelize.QueryTypes.SELECT,
  });

  res.render("vehicles", { user: req.user, vehicles: vehicles });
});

router.get("/cruiseControl", async function (req, res, next) {
  const sql = `
  SELECT vehicles.*, ANY_VALUE(types.type) as type, ANY_VALUE(colours.name) as colour, GROUP_CONCAT(features.feature) as features,
    CASE WHEN DATE_ADD(lastServiceDate, INTERVAL 6 MONTH) < NOW() THEN 'false' ELSE 'true' END as serviceable
  FROM vehicles 
  JOIN vehicle_types ON vehicles.id = vehicle_types.VehicleId
  JOIN types ON vehicle_types.TypeId = types.id
  LEFT JOIN vehicle_features ON vehicles.id = vehicle_features.VehicleId 
  LEFT JOIN features ON vehicle_features.FeatureId = features.id
  LEFT JOIN vehicle_colours ON vehicles.id = vehicle_colours.VehicleId
  LEFT JOIN colours ON vehicle_colours.ColourId = colours.id
  WHERE features.feature = 'cruise control'
  GROUP BY vehicles.id
  `;
  const vehicles = await db.sequelize.query(sql, {
    type: db.sequelize.QueryTypes.SELECT,
  });

  res.render("vehicles", { user: null, vehicles: vehicles });
});

router.get("/popular", async function (req, res, next) {
  const mostPopularVehicleMakeQuery = `
    SELECT vehicles.make, COUNT(vehicles.make) as makeCount
    FROM vehicles 
    GROUP BY vehicles.make
    ORDER BY makeCount DESC
    LIMIT 1
  `;

  const mostPopularVehicleMakeResult = await db.sequelize.query(
    mostPopularVehicleMakeQuery,
    {
      type: db.sequelize.QueryTypes.SELECT,
    }
  );

  const mostPopularVehicleMake = mostPopularVehicleMakeResult[0].make;

  const vehiclesOfPopularMakeQuery = `
    SELECT vehicles.*, ANY_VALUE(types.type) as type, ANY_VALUE(colours.name) as colour, GROUP_CONCAT(features.feature) as features,
      CASE WHEN DATE_ADD(lastServiceDate, INTERVAL 6 MONTH) < NOW() THEN 'false' ELSE 'true' END as serviceable
    FROM vehicles 
    JOIN vehicle_types ON vehicles.id = vehicle_types.VehicleId
    JOIN types ON vehicle_types.TypeId = types.id
    LEFT JOIN vehicle_features ON vehicles.id = vehicle_features.VehicleId 
    LEFT JOIN features ON vehicle_features.FeatureId = features.id
    LEFT JOIN vehicle_colours ON vehicles.id = vehicle_colours.VehicleId
    LEFT JOIN colours ON vehicle_colours.ColourId = colours.id
    WHERE vehicles.make = :make
    GROUP BY vehicles.id
  `;

  const vehiclesOfPopularMake = await db.sequelize.query(
    vehiclesOfPopularMakeQuery,
    {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: { make: mostPopularVehicleMake },
    }
  );

  res.render("vehicles", { user: null, vehicles: vehiclesOfPopularMake });
});

// router.post("/rent", onlyCustomers, async function (req, res, next) {
//   const userId = req.user.id;
//   const { vehicleId } = req.body;

//   try {
//     let checkQuery = `
//       SELECT * FROM user_vehicles
//       WHERE UserId = :UserId
//     `;

//     const existingRentals = await db.sequelize.query(checkQuery, {
//       replacements: { UserId: userId },
//       type: db.sequelize.QueryTypes.SELECT,
//     });

//     if (existingRentals.length > 0) {
//       return res.status(400).json({
//         error: "You already have a rented vehicle.",
//       });
//     }

//     const vehicle = await vehicleService.getOne(vehicleId);

//     if (vehicle.rented != 0) {
//       return res.status(400).json({
//         error: "This vehicle is already rented.",
//       });
//     }

//     let sixMonthsAgo = new Date();
//     sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

//     if (vehicle.lastServiceDate < sixMonthsAgo) {
//       return res.status(400).json({
//         error:
//           "Cannot rent vehicles that haven't been serviced in the last 6 months.",
//       });
//     }

//     await vehicleService.update(vehicleId, 1);

//     // Add rental to user_vehicles junction table
//     let insertQuery = `
//       INSERT INTO user_vehicles (createdAt, updatedAt, UserId, VehicleId)
//       VALUES (:createdAt, :updatedAt, :UserId, :VehicleId)
//     `;

//     await db.sequelize.query(insertQuery, {
//       replacements: {
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         UserId: userId,
//         VehicleId: vehicleId,
//       },
//     });

//     return res.status(200).json({
//       message: "Vehicle successfully rented.",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       error: "An unexpected error occurred.",
//     });
//   }
// });

router.post("/rent", onlyCustomers, async function (req, res, next) {
  const userId = req.user.id;
  const { vehicleId } = req.body;

  console.log("||||||||||||||||||||||||", vehicleId);
  console.log(typeof vehicleId);

  try {
    let checkQuery = `
      SELECT * FROM user_vehicles
      WHERE UserId = :UserId
    `;

    const existingRentals = await db.sequelize.query(checkQuery, {
      replacements: { UserId: userId },
      type: db.sequelize.QueryTypes.SELECT,
    });

    if (existingRentals.length > 0) {
      return res.status(400).json({
        error: "You already have a rented vehicle.",
      });
    }

    const vehicle = await vehicleService.getOne(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        error: "Vehicle not found.",
      });
    }

    if (vehicle.rented != 0) {
      return res.status(400).json({
        error: "This vehicle is already rented.",
      });
    }

    let sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    if (vehicle.lastServiceDate < sixMonthsAgo) {
      return res.status(400).json({
        error:
          "Cannot rent vehicles that haven't been serviced in the last 6 months.",
      });
    }

    await vehicleService.update(vehicleId, 1);

    // Add rental to user_vehicles junction table
    let insertQuery = `
      INSERT INTO user_vehicles (createdAt, updatedAt, UserId, VehicleId) 
      VALUES (:createdAt, :updatedAt, :UserId, :VehicleId)
    `;

    await db.sequelize.query(insertQuery, {
      replacements: {
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: userId,
        VehicleId: vehicleId,
      },
    });

    return res.status(200).json({
      message: "Vehicle successfully rented.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "An unexpected error occurred.",
    });
  }
});

router.delete("/cancel", onlyAdminUsers, async function (req, res, next) {
  const { vehicleId } = req.body;

  try {
    let query = `
      DELETE FROM user_vehicles 
      WHERE VehicleId = :VehicleId
    `;

    await vehicleService.update(vehicleId, 0);

    await db.sequelize.query(query, {
      replacements: {
        VehicleId: vehicleId,
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Vehicle rental successfully canceled.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      error: "An unexpected error occurred.",
    });
  }
});

module.exports = router;
