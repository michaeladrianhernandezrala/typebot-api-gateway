const bcrypt = require('bcrypt');

const authService = require('../services/authService');
const responseHelper = require('../utils/responseHelper');
const config = require('../config/config');

class authController {
  /**
   * POST /auth/register
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async postRegisterUser(req, res) {
    const payload = req.body;

    if (!payload.email) {
      responseHelper.badRequest(req, res, 'Email property is required');
      return;
    }
    if (!payload.password) {
      responseHelper.badRequest(req, res, 'Password property is required');
    }

    try {
      const user = await authService.findUserByEmail(payload.email);
      if (user) {
        responseHelper.badRequest(req, res, 'Email already exits');
        return;
      }

      const hasPassword = await bcrypt.hash(payload.password, config.saltRoundsBcrypt);
      payload.password = hasPassword;
      payload.accountId = 1;

      const userCreated = await authService.createUser(payload);
      responseHelper.created(req, res, userCreated);
    } catch (error) {
      responseHelper.error(req, res, error);
    }
  }
}

module.exports = {
  postRegisterUser: authController.postRegisterUser,
};
