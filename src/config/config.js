import logger from '../libs/logger';

module.exports = {
  database: 'ntask',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: 'ntask.sqlite',
    logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`);
    },
    define: {
      unserscored: true,
    },
  },
  jwtSecret: '3f7f7ebc8dcbbd8df876ca2e95013b86',
  jwtSession: { session: true },
};
