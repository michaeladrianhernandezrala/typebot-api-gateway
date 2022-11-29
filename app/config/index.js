module.exports = {
  app: {
    PORT: 3606,
  },
  bcryptConfig: {
    saltOrRounds: 10,
    privateKeyJWT: 'IQKcPhiam7EUw4lein026RUnAmD5KQ36',
    expiresIn: '2d',
  },
  sequelize: {
    DATABASE: 'typebot_service_db',
    USERNAME: 'typebot_service_user',
    PASSWORD: 'typebot_service_user',
  },

};
