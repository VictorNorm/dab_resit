class TypeService {
  constructor(db) {
    this.client = db.sequelize;
  }

  async create(type) {
    return this.client.query("INSERT INTO Types (type) VALUES (:type)", {
      replacements: { type: type },
      type: this.client.QueryTypes.INSERT,
    });
  }

  async getAll() {
    return this.client.query("SELECT * FROM Types", {
      type: this.client.QueryTypes.SELECT,
    });
  }

  async delete(typeId) {
    return this.client.query("DELETE FROM Types WHERE id = :id", {
      replacements: { id: typeId },
      type: this.client.QueryTypes.DELETE,
    });
  }

  async update(type, id) {
    return this.client.query("UPDATE Types SET type = :type WHERE id = :id", {
      replacements: { type: type, id: id },
      type: this.client.QueryTypes.UPDATE,
    });
  }
}

module.exports = TypeService;

// class TypeService {
//   constructor(db) {
//     this.client = db.sequelize;
//     this.Type = db.Type;
//   }

//   async create(type) {
//     return this.Type.create({
//       type: type,
//     });
//   }

//   async getAll() {
//     return this.Type.findAll();
//   }

//   async delete(typeId) {
//     return this.Type.destroy({
//       where: { id: typeId },
//     });
//   }

//   async update(type, id) {
//     return this.Type.update(
//       {
//         type: type,
//       },
//       {
//         where: { id: id },
//       }
//     );
//   }
// }

// module.exports = TypeService;
