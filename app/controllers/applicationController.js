const Account = require('../models/account');
const Application = require('../models/application');
const responseHelper = require('../utils/responseHelper');

class applicationController {
  /**
   * /GET /application
   * @param {*} req
   * @param {*} res
   */
  static async getListApplications(req, res) {
    const payload = req.body;
  }

  /**
   * POST /application
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async postApplication(req, res) {
    const payload = req.body;

    try {
      /**
       * Check if all required properties exist
       */
      if (!payload.accountId) {
        responseHelper.badRequest(req, res, 'AccountId property is required');
        return;
      }

      const account = await Account.findOne({ where: { id: payload.accountId } });
      if (!account) {
        responseHelper.badRequest(req, res, "Account's id not exits");
        return;
      }

      const application = await Application.create(payload);
      responseHelper.created(req, res, application);
    } catch (error) {
      responseHelper.error(req, res, error);
    }
  }

  /**
   * GET /application/{id}
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getSingleApplication(req, res) {
    const { id } = req.params;

    try {
      /**
       * Check if all required properties exist
       */
      if (!id) {
        responseHelper.badRequest(req, res, "Application's id param is required");
        return;
      }

      const application = await Application.findOne({ where: { id } });
      if (!application) {
        responseHelper.badRequest(req, res, "Application's not exists");
        return;
      }

      responseHelper.ok(req, res, application);
    } catch (error) {
      responseHelper.error(req, res, error);
    }
  }

  /**
   * PUT /application/{id}
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async putApplication(req, res) {
    const { id } = req.params;
    const payload = req.body;

    try {
      /**
       * Check if all required properties exist
       */
      if (!id) {
        responseHelper.badRequest(req, res, "Application's id param is required");
        return;
      }

      const application = await Application.findOne({ where: { id } });
      if (!application) {
        responseHelper.badRequest(req, res, "Application's not exists");
        return;
      }

      const updated = await application.set(payload);
      responseHelper.ok(req, res, updated);
    } catch (error) {
      responseHelper.error(req, res, error);
    }
  }
}

module.exports = {
  postApplication: applicationController.postApplication,
  getSingleApplication: applicationController.getSingleApplication,
  putApplication: applicationController.putApplication,
};
