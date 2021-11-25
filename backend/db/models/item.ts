'use strict';

import type { DataTypes, Sequelize } from "sequelize/types";
import type { AggregateModels } from './utilTypes';

import { Model } from 'sequelize';

export default (sequelize: Sequelize, { BOOLEAN, INTEGER, DECIMAL, STRING, TEXT, DATE }: typeof DataTypes) => {
  class Item extends Model {
    static associate({ User, Account }: AggregateModels) {
      Item.belongsTo(User, { foreignKey: 'user_id' });
      Item.belongsTo(Account, { foreignKey: 'account_id' });
    }
  }

  Item.init({
    name: { type: STRING(50), allowNull: false },
    is_expense: BOOLEAN,
    description: { type: TEXT, allowNull: false },
    date_expected: { type: DATE, allowNull: false },
    is_recurring: BOOLEAN,
    amount: { type: DECIMAL(10, 2), allowNull: false },
    category: { type: STRING(50), allowNull: false },
    user_id: {
      type: INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    account_id: {
      type: INTEGER,
      allowNull: false,
      references: { model: 'Accounts' }
    }
  }, { sequelize, modelName: 'Items' });
  return Item;
};
