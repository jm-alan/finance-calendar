import User from './user';
import Account from './account';
import Item from './item';

export type QueryArg = {
  where: {
    id?: number
  }
}

export type AggregateModels = {
  User: User,
  Account: Account,
  Item: Item
}
