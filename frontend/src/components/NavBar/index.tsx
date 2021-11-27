import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LoginForm from '../Auth/LoginForm';
import SignupForm from '../Auth/SignupForm';
import { SetModal } from '../../store/modal';
import { LogOut } from '../../store/session';
import { ShowModal } from '../../store/UX';

import './index.css';

export default function NavBar () {
  const dispatch = useDispatch();

  const user = useSelector((state: State) => state.session.user);

  const popLogin = () => {
    dispatch(SetModal(LoginForm));
    dispatch(ShowModal());
  };

  const popSignup = () => {
    dispatch(SetModal(SignupForm));
    dispatch(ShowModal());
  };

  const logOut = () => dispatch(LogOut());

  return (
    <nav>
      {user
        ? (
          <>
            <Link to='/'>
              Home
            </Link>
            <Link to='/users/me/'>
              My Profile
            </Link>
            <button onClick={logOut}>
              Log Out
            </button>
          </>
        )
        : (
          <div className='button_container'>
            <button className='main_button' onClick={popLogin}>
              Log In
            </button>
            <button className='main_button' onClick={popSignup}>
              Sign Up
            </button>
          </div>
        )}
    </nav>
  );
}
