import { MouseEventHandler, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LoginForm from '../Auth/LoginForm';
import SignupForm from '../Auth/SignupForm';
import { SetModal } from '../../store/modal';
import { LogOut } from '../../store/session';
import { Hidebar, ShowModal, Sidebar } from '../../store/UX';
import { useDocumentEvents } from '../../utils/hooks';

import './index.css';

export default function NavBar () {
  const dispatch = useDispatch();

  const user = useSelector((state: State) => state.session.user);
  const sidebar = useSelector((state: State) => state.UX.navBar);

  const { click } = useDocumentEvents();

  const popLogin = () => {
    dispatch(SetModal(LoginForm));
    dispatch(ShowModal());
  };

  const popSignup = () => {
    dispatch(SetModal(SignupForm));
    dispatch(ShowModal());
  };

  const logOut = () => dispatch(LogOut());

  const resist: MouseEventHandler<HTMLElement> = e => e.stopPropagation();

  useEffect(() => {
    if (sidebar) return click(() => dispatch(Hidebar()));
  }, [dispatch, click, sidebar]);

  return (
    <>
      <button
        className='navbar_show_hide'
        onClick={() => dispatch(!sidebar ? Sidebar() : Hidebar())}
      >
        <div className='navbar_button--inner first' />
        <div className='navbar_button--inner second' />
        <div className='navbar_button--inner third' />
        <div className='navbar_button--inner fourth' />
      </button>
      <nav onClick={resist} className={`${sidebar ? 'show' : ''}`}>
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
    </>
  );
}
