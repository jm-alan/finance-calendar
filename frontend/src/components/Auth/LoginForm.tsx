import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Auth from '.';
import { LogIn } from '../../store/session';
import AuthInput from './AuthInput';

export default function LoginForm () {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    dispatch(LogIn(email, password));
  };

  return (
    <Auth onSubmit={onSubmit}>
      <AuthInput
        type='email'
        onChangeText={setEmail}
        value={email}
      />
      <AuthInput
        type='password'
        onChangeText={setPassword}
        value={password}
      />
      <button className='pop-button background-blue'>
        Log In
      </button>
    </Auth>
  );
}
