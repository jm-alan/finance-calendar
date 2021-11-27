import type { FormEvent, ReactChild } from 'react';
import { useDispatch } from 'react-redux';
import { ClearErrors } from '../../store/errors';

import './index.css';

type AuthProps = {
  onSubmit: () => void;
  children: ReactChild[];
};

export default function Auth ({ onSubmit, children }: AuthProps) {
  const dispatch = useDispatch();

  const wrappedSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(ClearErrors());
    onSubmit();
  };

  return (
    <form
      onSubmit={wrappedSubmit}
      className='auth-form background-purple'
    >
      {children}
    </form>
  );
}
