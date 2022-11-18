const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    /**
     * Check if required parameters exits: email and password
     *  */
    if (!payload.email) {
      responseHelper.badRequest(req, res, 'Email property is required');
      return;
    }
    if (!payload.password) {
      responseHelper.badRequest(req, res, 'Password property is required');
      return;
    }

    try {
      const user = await authService.findUserByEmail(payload.email);
      if (user) {
        responseHelper.badRequest(req, res, 'Email already exits');
        return;
      }

      const hasPassword = await bcrypt.hash(payload.password, config.saltRoundsBcrypt);
      payload.password = hasPassword;

      // TODO: Create an account an associate to the user
      payload.accountId = 1;

      const userCreated = await authService.createUser(payload);
      responseHelper.created(req, res, userCreated);
    } catch (error) {
      responseHelper.error(req, res, error);
    }
  }

  /**
   * POST /auth/login
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async postLoginUser(req, res) {
    const payload = req.body;

    /**
     * Check if required parameters exits: email and password
     *  */
    if (!payload.email) {
      responseHelper.badRequest(req, res, 'Email property is required');
      return;
    }
    if (!payload.password) {
      responseHelper.badRequest(req, res, 'Password property is required');
      return;
    }

    try {
      const user = await authService.findUserByEmail(payload.email);
      if (!user) {
        responseHelper.badRequest(req, res, 'Email not exits');
        return;
      }

      const isPasswordCorrect = await bcrypt.compare(payload.password, user.password);

      if (!isPasswordCorrect) {
        responseHelper.badRequest(req, res, 'Password is not correct');
        return;
      }

      // TODO: Change time expires to minutes
      const token = await jwt.sign({ ...user }, config.privateKeyJWT, { expiresIn: '2d' });
      user.dataValues.jwt = token;

      responseHelper.ok(req, res, user);
    } catch (error) {
      responseHelper.error(req, res, error);
    }
  }
}

module.exports = {
  postRegisterUser: authController.postRegisterUser,
  postLoginUser: authController.postLoginUser,
};
