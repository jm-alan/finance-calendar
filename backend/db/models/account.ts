'use strict';

import {  Model } from 'sequelize';
import { DataTypes, Sequelize, ModelStatic } from 'sequelize/types'

export default (sequelize: Sequelize, { INTEGER, DECIMAL, STRING, TEXT }: typeof DataTypes) => {
  class Account extends Model {
    static associate({ User, Item }: { User: ModelStatic<Model<any, any>>, Item: ModelStatic<Model <any, any>> }) {
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
