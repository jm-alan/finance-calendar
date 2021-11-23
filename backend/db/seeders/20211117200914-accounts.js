'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Accounts', [
      { name: 'Bank of America Checking Account', balance: 250.00, historic_balance: null, user_id: 1 },
      { name: 'Bank of America Savings Account', balance: 1350.00, historic_balance: null, user_id: 1 },
      { name: 'Charles Schwab Investment Account', balance: 200.00, historic_balance: null, user_id: 1 },
      { name: 'Chase Bank Homebuyers Savings', balance: 5600.00, historic_balance: null, user_id: 1 }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Accounts', null, {});
  }
};
