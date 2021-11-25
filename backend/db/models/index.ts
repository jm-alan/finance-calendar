'use strict';

import { Sequelize } from 'sequelize';
import config from '../../config/database';
import User from './user';
import Account from './account';
import Item from './item';

export const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, config)
  : new Sequelize(config.database, config.username, config.password, config);

[User, Account, Item].forEach(model => model.associate({ User, Account, Item }))
