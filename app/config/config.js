const config = {
  PORT: 3610,
  saltRoundsBcrypt: 10,
  privateKeyJWT: 'TyMtUNBwoqrNVy5EhRhy6WChkoCIXhOm',
  sequelize: {
    DATABASE: 'typebot_service_db',
    USERNAME: 'typebot_service_user',
    PASSWORD: 'typebot_service_user',
    dbConfig: {
      host: 'localhost',
      dialect: 'postgres',
    },
  },
};

module.exports = config;
