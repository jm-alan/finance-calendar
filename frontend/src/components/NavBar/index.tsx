import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LoginForm from '../Auth/LoginForm';
import SignupForm from '../Auth/SignupForm';
import { SetModal } from '../../store/modal';
import { LogOut } from '../../store/session';
import { Hidebar, ShowModal, Sidebar } from '../../store/UX';

import './index.css';
import { MouseEventHandler, useEffect } from 'react';

export default function NavBar () {
  const dispatch = useDispatch();

  const user = useSelector((state: State) => state.session.user);
  const sidebar = useSelector((state: State) => state.UX.navBar);

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
    const hidebar = () => dispatch(Hidebar());
    if (sidebar) document.addEventListener('click', hidebar);
    return () => {
      document.removeEventListener('click', hidebar);
    };
  }, [dispatch, sidebar]);

  return (
    <>
      <button
        className='navbar_show_hide'
        onClick={() => dispatch(!sidebar ? Sidebar() : Hidebar())}
      >
        <div className='navbar_hamburger' />
        <div className='navbar_hamburger' />
        <div className='navbar_hamburger' />
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
