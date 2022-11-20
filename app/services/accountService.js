const Account = require('../models/account');
const User = require('../models/user');
const db = require('../lib/db');

class accountService {
  /**
   * Create an account
   * @param {*} accountDate
   * @param {*} userData
   */
  static async createAccount(accountData, userData) {
    /**
     * 1. Create account
     * 2. Create user
     */

    // eslint-disable-next-line consistent-return
    return db.transaction(async (t) => {
      const result = {};

      try {
        const account = await Account.create(accountData, { transaction: t });
        result.account = account;
        const data = Object.assign(userData, { accountId: account.id });
        const user = await User.create(data, { transaction: t });
        result.user = user;
        return result;
      } catch (error) {
        await t.rollback();
      }
    });
  }
}

module.exports = accountService;
