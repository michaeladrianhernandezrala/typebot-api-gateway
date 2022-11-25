const bcrypt = require('bcrypt');
const uuid = require('uuid');
const User = require('../models/user');
const responseHelper = require('../utils/responseHelper');

class userController {
  static async postUser(req, res) {
    const paylod = req.body;

    /**
     * Check if all required fields exist
     */
    if (!paylod.accountId) {
      responseHelper.badRequest(req, res, 'Account id property is required');
      return;
    }
    if (!paylod.userType) {
      responseHelper.badRequest(req, res, 'UserType property is required');
      return;
    }
    if (!paylod.roleType) {
      responseHelper.badRequest(req, res, 'RoleType property is required');
      return;
    }

    try {
      if (paylod.userType === 'human') {
        const hashPassword = await bcrypt.hash(paylod.password, process.env.saltRoundsBcrypt);
        paylod.password = hashPassword;
      }

      if (paylod.userType === 'server') {
        paylod.secretKey = uuid();
      }

      const user = await User.create(paylod);
      responseHelper.created(req, res, user);
    } catch (error) {
      responseHelper.error(req, res, error);
    }
  }
}

module.exports = {
  postUser: userController.postUser,
};
