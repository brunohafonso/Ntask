import Sequelize from 'sequelize';

const {
  database, username, password, params,
} = require('./config');

let sequelize;

module.exports = () => {
  if (!sequelize) {
    sequelize = new Sequelize(database, username, password, params);
  }

  return sequelize;
};
