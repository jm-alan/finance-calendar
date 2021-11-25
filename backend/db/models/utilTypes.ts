import { Account, Item, User } from "."

export type QueryArg = {
  where: {
    id?: number
  }
}

export type AggregateModels = {
  User: typeof User,
  Account: typeof Account,
  Item: typeof Item
}
