import { Dispatch } from 'redux';
import csrfetch from './csrfetch';
import { TearDown } from './modal';
import { HideModal } from './UX';

const SET_USER = 'session/SET';

const setSession = (user = null) => ({
  type: SET_USER,
  user
});

export const Load = () => async (dispatch: Dispatch<SessionAction>) => {
  const { user } = await csrfetch.get('/api/session/');
  csrfetch.captureDispatch(dispatch);
  csrfetch.restoreCSRF();
  dispatch(setSession(user));
};

export const LogIn = (email: string, password: string) => async (dispatch: Dispatch<SessionAction>) => {
  const { user } = await csrfetch.post('/api/session/', { email, password });
  dispatch(setSession(user));
  dispatch(HideModal());
  dispatch(TearDown());
};

export const SignUp = (firstName: string, email: string, password: string) => async (dispatch: Dispatch<SessionAction>) => {
  const { user } = await csrfetch.post('/api/users/', { firstName, email, password });
  dispatch(setSession(user));
};

export const LogOut = () => async (dispatch: Dispatch<SessionAction>) => {
  await csrfetch.destroy('/api/session/');
  dispatch(setSession());
};

export default function reducer (
  state = { user: null, loaded: false },
  { type, user }: SessionAction
) {
  switch (type) {
    case SET_USER:
      return { user, loaded: true };
    default:
      return state;
  }
};
