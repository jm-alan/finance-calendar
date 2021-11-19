// constants
const GET_ACCOUNTS = 'account/GET_ACCOUNTS';

// actions
const getAccounts = (accounts) => ({ type: GET_ACCOUNTS, payload: accounts });

// thunk actions
export const getAllAccounts = (accountId) => async (dispatch) => {
    const res = await fetch(`/api/accounts/`)
    const data = await res.json();
    dispatch(getReviews(data));
}

// reducer
export default function reducer(state = {}, action) {
    let newState = {};
    switch (action.type) {
        case GET_ACCOUNTS:
            newState = { ...state };
            action.payload.accounts.forEach(account => {
                newState[account.id] = account;
            })
            return newState;

        default:
            return state;
    }
}
