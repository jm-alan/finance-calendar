'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, { DataTypes, fn }) => {
  class Item extends Model {
    static associate ({ User, Account }) {
      Item.belongsTo(User, { foreignKey: 'user_id' });
    }
  }

  Item.init({
    name: { type: DataTypes.STRING(50), allowNull: false },
    is_expense: DataTypes.BOOLEAN,
    description: { type: DataTypes.TEXT, allowNull: false },
    date_expected: { type: DataTypes.DATE, allowNull: false },
    is_recurring: DataTypes.BOOLEAN,
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    category: { type: DataTypes.STRING(50), allowNull: false },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: fn('NOW')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: fn('NOW')
    }
  }, { sequelize, modelName: 'Items' });
  return Item;
};
