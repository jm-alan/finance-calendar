import seedUsers from './20210429142508-default-users';
import seedAccounts from './20211117200914-accounts';
import seedItems from './20211117210711-default-items';
import { sequelize } from '../models/index';

const action = process.argv[2];

(() => {
  const qi = sequelize.getQueryInterface();
  [
    seedUsers,
    seedAccounts,
    seedItems
  ].forEach(async exp => {
    if (action === 'up' || action === 'down') await exp[action](qi)
  });
})();
