'use strict';

import { QueryInterface } from "sequelize/types";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('Accounts', [
      { name: 'Bank of America Checking Account', balance: 250.00, historic_balance: null, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bank of America Savings Account', balance: 1350.00, historic_balance: null, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Charles Schwab Investment Account', balance: 200.00, historic_balance: null, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chase Bank Homebuyers Savings', balance: 5600.00, historic_balance: null, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('Accounts', null, {});
  }
};
