'use strict';

import { Sequelize, DataTypes } from 'sequelize';
import config from '../../config/database';
import createUserClass from './user';
import createAccountClass from './account';
import createItemClass from './item';

export const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, config)
  : new Sequelize(config.database, config.username, config.password, config);

export const User = createUserClass(sequelize, DataTypes);
export const Account = createAccountClass(sequelize, DataTypes);
export const Item = createItemClass(sequelize, DataTypes);
