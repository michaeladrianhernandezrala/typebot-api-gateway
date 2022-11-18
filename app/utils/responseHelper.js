/* eslint-disable no-underscore-dangle */
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const logger = require('./logger');

class responseHelper {
  static _getLog(req, message) {
    const log = {
      method: req.method,
      url: req.url,
    };

    return Object.assign(log, message);
  }

  /**
   * 200 Ok
   * @param {*} req
   * @param {*} res
   * @param {*} body
   * @param {*} count
   */
  static ok(req, res, body, count) {
    const response = {
      statusCode: StatusCodes.OK,
      message: ReasonPhrases.OK,
    };

    if (count !== null && count !== undefined) {
      response.count = count;
    }
    if (body) {
      response.data = body;
    }

    res.status(response.statusCode).json(response);
  }

  /**
   * 201 Created
   * @param {*} req
   * @param {*} res
   * @param {*} data
   */
  static created(req, res, data) {
    const response = {
      statusCode: StatusCodes.CREATED,
      message: ReasonPhrases.CREATED,
      data,
    };

    res.status(response.statusCode).json(response);
  }

  /**
   * 400 Bad Request
   * @param {*} req
   * @param {*} res
   * @param {*} errorCode
   * @param {*} message
   */
  static badRequest(req, res, errorCode, message = 'Bad Request') {
    const response = {
      statusCode: StatusCodes.BAD_REQUEST,
      message,
      errorCode,
    };

    logger.error(responseHelper._getLog(req, response));
    res.status(response.statusCode).json(response);
  }

  /**
   * 403 Forbidden
   * @param {*} req
   * @param {*} res
   * @param {*} errorCode
   */
  static forbidden(req, res, errorCode) {
    const response = {
      statusCode: StatusCodes.FORBIDDEN,
      errorCode,
    };

    logger.error(responseHelper._getLog(req, response));
    res.status(response.statusCode).json(response);
  }

  /**
   * 404 Not Found
   * @param {*} req
   * @param {*} res
   * @param {*} errorCode
   */
  static notFound(req, res, errorCode) {
    const response = {
      statusCode: StatusCodes.NOT_FOUND,
      errorCode,
    };

    logger.error(responseHelper._getLog(req, response));
    res.status(response.statusCode).json(response);
  }

  /**
   * 500 Internal Server Error
   * @param {*} req
   * @param {*} res
   * @param {*} errorCode
   */
  static error(req, res, errorCode) {
    const response = {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      errorCode,
    };

    logger.error(responseHelper._getLog(req, response));
    res.status(response.statusCode).json(response);
  }
}

module.exports = responseHelper;
