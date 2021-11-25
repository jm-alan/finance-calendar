'use strict';

import { Sequelize } from 'sequelize';
import config from '../../config/database';
import createUserClass from './user';
import createAccountClass from './account';
import createItemClass from './item';

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

module.exports = db;
