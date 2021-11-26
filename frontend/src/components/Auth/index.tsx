import type { FormEvent, ReactChild } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TearDown } from '../../store/modal';
import { HideModal } from '../../store/UX';
import { ClearErrors } from '../../store/errors';

import './index.css';

type AuthProps = {
  onSubmit: () => void;
  children: ReactChild[];
};

export default function Auth ({ onSubmit, children }: AuthProps) {
  const dispatch = useDispatch();

  const user = useSelector((state: State) => state.session.user);

  if (user) {
    dispatch(TearDown());
    dispatch(HideModal());
  }

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
