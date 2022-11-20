const Account = require('../models/account');

class accountService {
  static async createAccount(userId) {
    const data = { userId };
    const account = await Account.create(data);
    return account;
  }
}

module.exports = accountService;
