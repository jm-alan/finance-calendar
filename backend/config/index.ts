import { config } from 'dotenv';
import { resolve } from 'path';
if (process.env.NODE_ENV !== 'production') config({ path: resolve(__dirname, '..', '.env') });

export const {
  PORTS,
  PORT,
  DB_USER: username,
  DB_PASS: password,
  DB_NAME: database,
  DB_HOST: host,
  SECRET: secret,
  EXPIRES: expiresIn,
  NODE_ENV: environment = 'development'
} = process.env;

export const db = { username, password, database, host };
export const ports = (PORTS && JSON.parse(PORTS)) || [PORT];
export const jwtConfig = { secret, expiresIn: parseInt(expiresIn) };
