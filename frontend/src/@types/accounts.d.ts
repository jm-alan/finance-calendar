declare type ExtantAccount = {
  id: number;
  name: string;
  balance: number;
  historic_balance: string;
  user_id: number;
  createdAt: Date,
  updatedAt: Date;
};

declare type ExtantAccountCollection = {
  [key: number]: ExtantAccount | null;
};

declare type AccountState = {
  all: ExtantAccountCollection;
  loaded: boolean;
};

declare type NewAccount = {
  name: string;
  balance: number;
  historicBalance: string;
  user_id: number;
};

declare type AccountAction = {
  type: string;
  account?: ExtantAccount;
  accounts?: ExtantAccountCollection;
};
