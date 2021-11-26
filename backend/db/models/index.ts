'use strict';

import { Sequelize } from 'sequelize';
import config from '../../config/database';

export const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, config)
  : new Sequelize(config.database, config.username, config.password, config);
