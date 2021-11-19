import csrfetch from './csrfetch';

const SET_USER = 'session/SET';

const setSession = (user = null) => ({
  type: SET_USER,
  user
});

export const Load = () => async dispatch => {
  const { user } = await csrfetch.get('/api/session/');
  csrfetch.captureDispatch(dispatch);
  csrfetch.restoreCSRF();
  dispatch(setSession(user));
};

export const LogIn = (email, password) => async dispatch => {
  const { user } = await csrfetch.post('/api/session/', { email, password });
  dispatch(setSession(user));
};

export const SignUp = (firstName, email, password) => async dispatch => {
  const { user } = await csrfetch.post('/api/users/', { firstName, email, password });
  dispatch(setSession(user));
};

export const LogOut = () => async dispatch => {
  await csrfetch.delete('/api/session/');
  dispatch(setSession());
};

export default function reducer (
  state = { user: null, loaded: false },
  { type, user }
) {
  switch (type) {
    case SET_USER:
      return { user, loaded: true };
    default:
      return state;
  }
}
