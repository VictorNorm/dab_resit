class ColourService {
  constructor(db) {
    this.client = db.sequelize;
    this.Colour = db.Colour;
  }

  async create(colour) {
    return this.Colour.create({
      name: colour,
    });
  }

  async getAll() {
    return this.Colour.findAll();
  }

  async delete(colourId) {
    return this.Colour.destroy({
      where: { id: colourId },
    });
  }

  async update(name, id) {
    return this.Colour.update(
      {
        name: name,
      },
      {
        where: { id: id },
      }
    );
  }
}

module.exports = ColourService;
