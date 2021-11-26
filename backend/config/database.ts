import { db, environment } from './index';
import { Dialect, Options } from 'sequelize/types';

const { username, password, database, host } = db;

const dialect: Dialect = 'postgres';

const config: Options = {
  development: {
    username,
    password,
    database,
    host,
    dialect,
    logging: false
  },
  production: {
    dialect,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
}[environment];

export default config;
