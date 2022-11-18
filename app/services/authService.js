const User = require('../models/user');

class authService {
  static async findUserByEmail(email) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  static async createUser(data) {
    const user = await User.create(data);
    return user;
  }
}

module.exports = authService;
