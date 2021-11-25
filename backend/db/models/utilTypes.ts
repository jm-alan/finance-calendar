import { DataTypes } from "sequelize/types";

export type DataFnArg = {
  DataTypes: typeof DataTypes,
  fn: any
}

export type QueryArg = {
  where: {
    id?: number
  }
}
