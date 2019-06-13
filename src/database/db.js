import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config/config';

let db;

module.exports = () => {
  const {
    database, username, password, params,
  } = config;

  if (!db) {
    const sequelize = new Sequelize(database, username, password, params);

    db = {
      sequelize,
      Sequelize,
      models: {},
    };
    const dir = path.join(`${__dirname}../../`, 'models');
    fs.readdirSync(dir)
      .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename) && (file.slice(-3) === '.js'))
      .forEach((file) => {
        const modelDir = path.join(dir, file);
        const model = sequelize.import(modelDir);
        db.models[model.name] = model;
      });

    Object.keys(db.models).forEach((model) => {
      db.models[model].associate(db.models);
    });
  }

  return db;
};
