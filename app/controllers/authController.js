const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const responseHelper = require('../utils/responseHelper');
const authService = require('../services/authService');
const accountService = require('../services/accountService');

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

      const hasPassword = await bcrypt.hash(payload.password, process.env.saltRoundsBcrypt);
      payload.password = hasPassword;

      const userCreated = await authService.createUser(payload);
      const accountCreated = await accountService.createAccount(userCreated.dataValues.id);

      const data = {
        accountId: accountCreated.id,
        id: userCreated.id,
        name: userCreated.name,
        lastname: userCreated.lastname,
        email: userCreated.email,
        createdAt: userCreated.createdAt,
        updatedAt: userCreated.updatedAt,
      };
      responseHelper.created(req, res, data);
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

      // eslint-disable-next-line max-len
      const token = await jwt.sign({ ...user }, process.env.privateKeyJWT, { expiresIn: process.env.expiresIn });
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
