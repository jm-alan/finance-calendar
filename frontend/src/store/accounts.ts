import { Dispatch } from 'redux';
import csrfetch from "./csrfetch";

// constants
const GET_ACCOUNTS = 'account/GET_ACCOUNTS';
const CREATE_ACCOUNTS = 'accounts/CREATE_ACCOUNTS';
const DELETE_ACCOUNT = 'accounts/DELETE_ACCOUNT';
const SELECT_ACCOUNT = 'accounts/SELECT';
const DESELECT_ACCOUNT = 'accounts/DESELECT';
const UPDATE_ACCOUNT = 'accounts/UPDATE';

// actions
const getAccounts = (accounts: ExtantAccountCollection): AccountAction => ({
  type: GET_ACCOUNTS,
  accounts
});
const updateAccount = (account: ExtantAccount): AccountAction => ({
  type: UPDATE_ACCOUNT,
  account
});
const newAccount = (account: ExtantAccount): AccountAction => ({
  type: CREATE_ACCOUNTS,
  account
});
const deleteAccount = (account: ExtantAccount): AccountAction => ({
  type: CREATE_ACCOUNTS,
  account
});
export const SelectAccount = (id: number): AccountAction => ({
  type: SELECT_ACCOUNT,
  id
});
export const DeselectAccount = (): AccountAction => ({
  type: DESELECT_ACCOUNT
});

// thunk actions
export const getAllAccounts = () => async (dispatch: Dispatch<AccountAction>) => {
  const { accounts }: { accounts: ExtantAccountCollection; } = await csrfetch.get('/api/accounts/');
  dispatch(getAccounts(accounts));
};

export const updateAccountById = (id: number, balance: number, name: string) => async (dispatch: Dispatch<AccountAction>) => {
  const { account }: { account: ExtantAccount; } = await csrfetch.patch(`/api/accounts/${id}`, {balance, name});
  dispatch(updateAccount(account));
}

export const createAccount = (accountObj: NewAccount) => async (dispatch: Dispatch<AccountAction>) => {
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

export const deleteAccountById = (id: number) => async (dispatch: Dispatch<AccountAction>) => {
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
  state: AccountState = { all: {}, loaded: false, selected: null },
  { type, account, accounts, id }: AccountAction
): AccountState {
  switch (type) {
    case GET_ACCOUNTS:
      if (!accounts) return state;
      return {
        ...state,
        all: accounts
      };
    case UPDATE_ACCOUNT:
      if (!account) return state;
      return {
        ...state,
        all: {
          ...state.all,
          [account.id]: account
        }
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
    case DELETE_ACCOUNT:
      if (!id) return state;
      delete state.all[id];
      return {
        ...state,
        all: {
          ...state.all
        }
      };
    case SELECT_ACCOUNT:
      if (!id) return state;
      return {
        ...state,
        selected: state.all[id]
      };
    case DESELECT_ACCOUNT:
      return {
        ...state,
        selected: null
      };
    default:
      return state;
  }
}
