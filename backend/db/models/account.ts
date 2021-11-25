'use strict';

import type { DataTypes, Sequelize } from 'sequelize/types'
import type { AggregateModels } from './utilTypes';
import { Model } from 'sequelize';

export default (sequelize: Sequelize, { INTEGER, DECIMAL, STRING, TEXT }: typeof DataTypes) => {
  class Account extends Model {
    static associate({ User, Item }: AggregateModels) {
      Account.belongsTo(User, { foreignKey: 'user_id' });
      Account.hasMany(Item, { foreignKey: 'account_id' });
    }
  }

  Account.init({
    name: {
      type: STRING(50),
      allowNull: false
    },
    balance: {
      type: DECIMAL(10, 2),
      allowNull: false
    },
    historic_balance: TEXT,
    user_id: {
      type: INTEGER,
      references: {
        model: 'Users'
      }
    }
  }, {
    sequelize,
    modelName: 'Accounts'
  });

  return Account;
};
