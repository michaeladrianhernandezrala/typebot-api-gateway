const responseHelper = require('../utils/responseHelper');

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
      responseHelper.badRequest(req, res, 'ERROR', 'Email property is required');
      return;
    }
    if (!payload.password) {
      responseHelper.badRequest(req, res, 'ERROR', 'Password property is required');
      return;
    }

    console.log('hoal');
  }
}

module.exports = {
  postRegisterUser: authController.postRegisterUser,
};
