const bunyan = require('bunyan');

class LoggerWrapper {
  constructor() {
    this.bunyanClient = bunyan.createLogger({ name: 'typebot-backend' });
  }

  info(message) {
    this.bunyanClient.info({ ...message, time: new Date().getTime() });
  }

  error(message) {
    this.bunyanClient.error({ ...message, time: new Date().getTime() });
  }

  warn(message) {
    this.bunyanClient.warn({ ...message, time: new Date().getTime() });
  }

  debug(message) {
    this.bunyanClient.debug({ ...message, time: new Date().getTime() });
  }
}

module.exports = new LoggerWrapper();
