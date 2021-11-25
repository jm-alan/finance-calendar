import User from './user';
import Account from './account';
import Item from './item';

export default () => {
  User.hasMany(Account, { foreignKey: 'user_id' });
  User.hasMany(Item, { foreignKey: 'user_id' });
  Account.belongsTo(User, { foreignKey: 'user_id' });
  Account.hasMany(Item, { foreignKey: 'account_id' });
  Item.belongsTo(User, { foreignKey: 'user_id' });
  Item.belongsTo(Account, { foreignKey: 'account_id' });
}
