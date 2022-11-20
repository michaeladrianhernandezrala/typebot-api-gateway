const validator = require('deep-email-validator');
const responseHelper = require('../utils/responseHelper');

class userController {
  static async postUser(req, res) {
    const paylod = req.body;

    // Check accountId
    if (!paylod.accountId) {
      responseHelper.badRequest(req, res, 'Account id property is required');
      return;
    }

    try {
        if(validator(paylod.email))
    } catch (error) {

    }
  }
}

module.exports = {
  postUser: userController.postUser,
};
