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
        console.log('account', account);
        const data = Object.assign(userData, { accountId: account.id });
        console.log('data', data);
        const user = await User.create(data, { transaction: t });
        console.log('user', user);
        result.user = user;
        return result;
      } catch (error) {
        await t.rollback();
      }
    });
  }
}

module.exports = accountService;
