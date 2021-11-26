'use strict';

import type { Optional } from 'sequelize/types';

import { Model, DataTypes, fn } from 'sequelize';
import { sequelize } from '.';

interface ItemAttributes {
  id: number;
  name: string;
  is_expense: boolean;
  description: string;
  date_expected: Date;
  is_recurring: boolean;
  amount: number;
  category: string;
  user_id: number;
  account_id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ItemCreationAttributes extends Optional<ItemAttributes, 'id' | 'createdAt' | 'updatedAt'> { };

const { BOOLEAN, INTEGER, DECIMAL, STRING, TEXT, DATE } = DataTypes;

export default class Item
  extends Model<ItemAttributes, ItemCreationAttributes>
  implements ItemAttributes {

  public id: number;
  public name: string;
  public is_expense: boolean;
  public description: string;
  public date_expected: Date;
  public is_recurring: boolean;
  public amount: number;
  public category: string;
  public user_id: number;
  public account_id: number;
  
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

Item.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
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
}, { sequelize, modelName: 'Items' });
