'use strict';
const { hashSync } = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [
      { firstName: 'demo', email: 'demo@website.io', password: hashSync('password') }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
