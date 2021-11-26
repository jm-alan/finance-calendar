'use strict';

import { Optional, HasManyGetAssociationsMixin } from "sequelize/types";

import Item from "./item";
import { Model, DataTypes, fn } from 'sequelize';
import { sequelize } from '.';

interface AccountAttributes {
  id: number;
  name: string;
  balance: number;
  historic_balance: string;
  user_id: number;
  createdAt: Date,
  updatedAt: Date
}

interface AccountCreationAttributes extends Optional<AccountAttributes, 'id' | 'createdAt' | 'updatedAt'> { };

const { INTEGER, DECIMAL, STRING, TEXT, DATE } = DataTypes;

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
  },
  createdAt: {
    type: DATE,
    allowNull: false,
    defaultValue: fn('NOW')
  },
  updatedAt: {
    type: DATE,
    allowNull: false,
    defaultValue: fn('NOW')
  }
}, {
  sequelize,
  modelName: 'Accounts'
});
