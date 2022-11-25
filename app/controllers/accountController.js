/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
const Isemail = require('isemail');
const bcrypt = require('bcrypt');

const responseHelper = require('../utils/responseHelper');
const config = require('../config/config');
const accountService = require('../services/accountService');

class accountController {
  /**
   * Build an account response
   * @param {*} account
   * @param {*} user
   * @returns
   */
  static _buildAccountResponse(account, user) {
    const response = {
      id: account.id,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
      enabled: account?.enabled,
      name: account?.name ?? '',
      user: {
        id: user.id,
        email: user.email,
        username: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        roleType: user.roleType,
      },
    };
    return response;
  }

  /**
   * POST /account
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async postAccount(req, res) {
    const payload = req.body;

    try {
      /**
     * Check if all required fields exist
     */
      const isValidEmail = await Isemail.validate(payload.email);
      if (!payload.email || !isValidEmail) {
        responseHelper.badRequest(req, res, 'Email is not in right format or not present');
        return;
      }
      if (!payload.password) {
        responseHelper.badRequest(req, res, 'Password is not in right format or not present');
        return;
      }

      // Hash the password with bcrypt
      const hashPassword = await bcrypt.hash(payload.password, config.saltRoundsBcrypt);
      payload.password = hashPassword;

      // Create account and user
      const accountData = {
        enabled: true,
      };
      const userData = {
        name: payload.username,
        email: payload.email,
        password: payload.password,
        userType: 'human',
        roleType: 'account_owner',
        enabled: true,
      };

      const transaction = await accountService.createAccount(accountData, userData);
      const response = accountController._buildAccountResponse(transaction.account, transaction.user);
      responseHelper.created(req, res, response);
    } catch (error) {
      responseHelper.error(req, res, error);
    }
  }

  /**
   * GET /account/{id}
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getSingleAccount(req, res) {
    const { id } = req.params;

    // Check if account's id is present
    if (!id) {
      responseHelper.badRequest(req, res, "Account's id param is required");
      return;
    }

    try {
      const account = await accountService.getSingleAccount(id);
      if (!account) {
        responseHelper.badRequest(req, res, "Account's id not exists");
        return;
      }

      responseHelper.ok(req, res, account);
    } catch (error) {
      responseHelper.error(req, res, error);
    }
  }
}

module.exports = {
  postAccount: accountController.postAccount,
  getSingleAccount: accountController.getSingleAccount,
};
