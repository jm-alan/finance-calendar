'use strict';

import { QueryInterface } from "sequelize/types";

const defaultItems: any[] = [];

const makeItem = () => {
  const selector = Math.round(Math.random() * 4);
  return {
    name: ['dinner', 'groceries', 'streaming subscription', 'card payment', 'utility'][selector],
    is_expense: true,
    description: [
      'food',
      'food', ['Netflix', 'Hulu', 'Disney+', 'ESPN+', 'HBO Max'][Math.round(Math.random() * 4)],
      ['Visa', 'MasterCard', 'Discover', 'AmEx'][Math.round(Math.random() * 3)],
      ['Gas', 'Electric', 'Water'][Math.round(Math.random() * 2)]
    ][selector],
    date_expected: new Date(2021, Math.round(Math.random() * 11), Math.round(Math.random() * 27 + 1)),
    is_recurring: !!Math.round(Math.random()),
    amount: Math.round(Math.random() * 150),
    category: ['Fun', 'Necessities', 'Entertainment', 'Accounts', 'Home'][selector],
    user_id: 1,
    account_id: Math.round(Math.random() * 3 + 1)
  };
};

for (let i = 0; i < 1000; i++) defaultItems.push(makeItem());

for (let i = 0; i < 1000; i++) {
  defaultItems.push({
    name: 'paycheck',
    is_expense: false,
    description: 'got paid',
    date_expected: new Date(2021, Math.round(Math.random() * 11), Math.round(Math.random() * 27 + 1)),
    is_recurring: false,
    amount: Math.round(Math.random() * 100) + 1500,
    category: 'Income',
    user_id: 1,
    account_id: Math.round(Math.random() * 3 + 1)
  });
}

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('Items', defaultItems);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('Items', null, {});
  }
};
