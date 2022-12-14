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
        console.log('error', error);
        await t.rollback();
      }
    });
  }

  /**
   * Get a single account by id
   * @param {*} id
   * @returns
   */
  static async getSingleAccount(id) {
    const account = await Account.findOne({ where: { id } });
    return account;
  }
}

module.exports = accountService;
