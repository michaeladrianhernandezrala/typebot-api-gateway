const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const responseHelper = require('../utils/responseHelper');
const authService = require('../services/authService');

const { bcryptConfig } = require('../config');

class authController {
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

      // eslint-disable-next-line max-len
      const token = await jwt.sign({ ...user }, bcryptConfig.privateKeyJWT, { expiresIn: bcryptConfig.expiresIn });
      const response = { accessToken: token, user };

      responseHelper.ok(req, res, response);
    } catch (error) {
      responseHelper.error(req, res, error);
    }
  }
}

module.exports = {
  postLoginUser: authController.postLoginUser,
};
