import { Dispatch } from "redux";

// constants
const GET_ACCOUNTS = 'account/GET_ACCOUNTS';
const CREATE_ACCOUNTS = 'accounts/CREATE_ACCOUNTS';
const DELETE_ACCOUNTS = 'accounts/DELETE_ACCOUNTS';

type ExtantAccount = {
  id: number;
  name: string;
  balance: number;
  historic_balance: string;
  user_id: number;
  createdAt: Date,
  updatedAt: Date;
};

type NewAccount = {
  name: string;
  balance: number;
  historicBalance: string;
  user_id: number;
};

type AccountAction = {
  type: string;
  account?: ExtantAccount;
  accounts?: ExtantAccount[];
};

export type AccountState = {
  all: {
    [key: number]: ExtantAccount;
  };
  loaded: boolean;
};

// actions
const getAccounts = (accounts: ExtantAccount[]) => ({ type: GET_ACCOUNTS, accounts });
const newAccount = (account: ExtantAccount) => ({ type: CREATE_ACCOUNTS, account });
const deleteAccount = (account: ExtantAccount) => ({ type: CREATE_ACCOUNTS, account });

// thunk actions
export const getAllAccounts = () => async (dispatch: Dispatch<any>) => {
  const res = await fetch('/api/accounts/');
  const data = await res.json();
  dispatch(getAccounts(data));
};

export const createAccount = (accountObj: NewAccount) => async (dispatch: Dispatch<any>) => {
  const { name, balance, historicBalance } = accountObj;
  const res = await fetch('/api/reviews/accounts/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, balance, historicBalance })
  });
  const { account } = await res.json();
  dispatch(newAccount(account));
};

export const deleteAccountById = (id: number) => async (dispatch: Dispatch<any>) => {
  const res = await fetch(`/api/accounts/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  console.log('deleted', data);
  dispatch(deleteAccount(data));
};

// reducer
export default function reducer (
  state: AccountState = { all: {}, loaded: false },
  { type, account, accounts }: AccountAction
) {
  switch (type) {
    case GET_ACCOUNTS:
      return {
        ...state,
        all: accounts
      };
    case CREATE_ACCOUNTS:
      if (!account) return state;
      return {
        ...state,
        all: {
          ...state.all,
          [account.id]: account
        }
      };
    case DELETE_ACCOUNTS:
      if (!account) return state;
      return {
        ...state,
        all: {
          ...state.all,
          [account.id]: null
        }
      };
    default:
      return state;
  }
}
