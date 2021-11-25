'use strict';

import type { Optional, HasManyGetAssociationsMixin } from "sequelize/types";

import User from './user';
import Item from "./item";
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '.';

interface AccountAttributes {
  id: number;
  name: string;
  balance: number;
  historic_balance: string;
  user_id: number;
}

interface AccountCreationAttributes extends Optional<AccountAttributes, 'id'> { };

const { INTEGER, DECIMAL, STRING, TEXT } = DataTypes;

export default class Account
  extends Model<AccountAttributes, AccountCreationAttributes>
  implements AccountAttributes {
  public id: number;
  public name: string;
  public balance: number;
  public historic_balance: string;
  public user_id: number;

  public getItems: HasManyGetAssociationsMixin<Item>;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  static associate() {
    Account.belongsTo(User, { foreignKey: 'user_id' });
    Account.hasMany(Item, { foreignKey: 'account_id' });
  }
}

Account.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
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
