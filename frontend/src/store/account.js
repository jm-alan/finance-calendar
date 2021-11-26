// constants
const GET_ACCOUNTS = 'account/GET_ACCOUNTS';
const CREATE_ACCOUNTS = 'accounts/CREATE_ACCOUNTS';
const DELETE_REVIEWS = 'accounts/DELETE_ACCOUNTS';

// actions
const getAccounts = (accounts) => ({ type: GET_ACCOUNTS, payload: accounts });
const newAccount = (account) => ({ type: CREATE_ACCOUNTS, payload: account });
const deleteAccount = (account) => ({ type: CREATE_ACCOUNTS, payload: account });

// thunk actions
export const getAllAccounts = () => async (dispatch) => {
  const res = await fetch('/api/accounts/');
  const data = await res.json();
  dispatch(getAccounts(data));
};

export const createAccount = (accountObj) => async (dispatch) => {
  const { name, balance, historicBalance } = accountObj;
  const res = await fetch('/api/reviews/accounts/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, balance, historicBalance })
  });
  const data = await res.json();
  dispatch(newAccount(data));
};

export const deleteAccountById = (id) => async (dispatch) => {
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
export default function reducer (state = {}, action) {
  let newState = {};
  switch (action.type) {
    case GET_ACCOUNTS:
      newState = { ...state };
      action.payload.accounts.forEach(account => {
        newState[account.id] = account;
      });
      return newState;
    case CREATE_ACCOUNTS:
      newState = { ...state };
      newState[action.payload.account.id] = action.payload.account;
      return newState;
    case DELETE_REVIEWS:
      newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    default:
      return state;
  }
}
