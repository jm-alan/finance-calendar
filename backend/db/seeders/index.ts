import { QueryInterface } from 'sequelize/types';
import seedUsers from './20210429142508-default-users';
import seedAccounts from './20211117200914-accounts';
import seedItems from './20211117210711-default-items';
import { sequelize } from '../models/index';
import '../../utils/prototypes';

type actionArg = 'up' | 'down';
type seederExport = {
  up: (queryInterface: QueryInterface) => Promise<void>;
  down: (queryInterface: QueryInterface) => Promise<void>;
};
type orderedSeeder = [
  number,
  seederExport,
  'Users' | 'Accounts' | 'Items'
]

const action = (process.argv[2] || 'up') as actionArg;
const qi = sequelize.getQueryInterface();
const seeders: orderedSeeder[] = [
  [1, seedUsers, 'Users'],
  [2, seedAccounts, 'Accounts'],
  [3, seedItems, 'Items']
];

if (action === 'down') seeders.sort(([a], [b]) => b - a);

seeders.asyncForEach(async (seeder: orderedSeeder) => {
  console.log(`Running ${seeder[2]}: ${action}`);
  await seeder[1][action](qi);
  console.log(`${seeder[2]}: ${action} complete`);
});
