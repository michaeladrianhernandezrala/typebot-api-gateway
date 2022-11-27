module.exports = {
  app: {
    PORT: 3606,
  },
  bcryptConfig: {
    saltOrRounds: 10,
  },
  sequelize: {
    DATABASE: 'typebot-service-db',
    USER_DATABASE: 'typebot-service-user',
    PASSWORD: 'typebot-service-user',
  },

};
