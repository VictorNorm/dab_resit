class UserService {
  constructor(db) {
    this.client = db.sequelize;
    this.User = db.User;
  }

  async getAll() {
    return this.User.findAll({
      where: {},
    });
  }

  async getOne(userId) {
    return await this.User.findOne({
      where: { id: userId },
    });
  }
  async getOneByName(username) {
    return await this.User.findOne({
      where: { username: username },
    });
  }
}
module.exports = UserService;
