'use strict';

import { QueryInterface, Sequelize } from "sequelize/types";

export default {
  up: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await queryInterface.bulkInsert('Accounts', [
      { name: 'Bank of America Checking Account', user_id: 1, balance: 250.00, historic_balance: null, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bank of America Savings Account', user_id: 1, balance: 1350.00, historic_balance: null, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Charles Schwab Investment Account', user_id: 1, balance: 200.00, historic_balance: null, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chase Bank Homebuyers Savings', user_id: 1, balance: 5600.00, historic_balance: null, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.bulkDelete('Accounts', null, {});
    await sequelize.query('truncate "Accounts" restart identity cascade');
  }
};
