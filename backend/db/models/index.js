'use strict';

const Sequelize = require('sequelize');
const config = require('../../config/database');

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, config)
  : new Sequelize(config.database, config.username, config.password, config);

const db = {
  User: require('./user')(sequelize, Sequelize),
  Account: require('./account')(sequelize, Sequelize),
  Item: require('./item')(sequelize, Sequelize),
  sequelize,
  Sequelize
};
Object.values(db).forEach(model => model.associate && model.associate(db));

module.exports = db;
