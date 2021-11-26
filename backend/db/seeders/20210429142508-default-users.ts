'use strict';

import { QueryInterface } from "sequelize/types";

const { hashSync } = require('bcryptjs');

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('Users', [
      { firstName: 'demo', email: 'demo@website.io', password: hashSync('password'), createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
