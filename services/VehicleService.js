class VehicleService {
  constructor(db) {
    this.client = db.sequelize;
  }

  async getAll() {
    return this.client.query("SELECT * FROM Vehicles", {
      type: this.client.QueryTypes.SELECT,
    });
  }

  async getOne(vehicleId) {
    const result = await this.client.query(
      "SELECT * FROM Vehicles WHERE id = :id",
      {
        replacements: { id: vehicleId },
        type: this.client.QueryTypes.SELECT,
      }
    );

    const vehicle = result[0];

    if (!vehicle) {
      console.log(`Vehicle with id = ${vehicleId} not found.`);
    } else {
      console.log(`Vehicle with id = ${vehicleId} found:`, vehicle);
    }

    return vehicle || null;
  }

  async update(vehicleId, rented) {
    return this.client.query(
      "UPDATE Vehicles SET rented = :rented WHERE id = :id",
      {
        replacements: { rented, id: vehicleId },
        type: this.client.QueryTypes.UPDATE,
      }
    );
  }
}
module.exports = VehicleService;

// class VehicleService {
//   constructor(db) {
//     this.client = db.sequelize;
//     this.Vehicle = db.Vehicle;
//   }

//   async getAll() {
//     return this.Vehicle.findAll();
//   }

//   async getOne(vehicleId) {
//     return this.Vehicle.findOne({
//       where: { id: vehicleId },
//     });
//   }

//   async update(vehicleId, rented) {
//     return this.Vehicle.update(
//       {
//         rented: rented,
//       },
//       {
//         where: { id: vehicleId },
//       }
//     );
//   }
// }
// module.exports = VehicleService;
