'use strict';

import { QueryInterface, Sequelize } from "sequelize/types";

const { hashSync } = require('bcryptjs');

export default {
  up: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      { firstName: 'demo', email: 'demo@website.io', password: hashSync('password'), createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await sequelize.query('truncate "Users" restart identity cascade');
  }
};
