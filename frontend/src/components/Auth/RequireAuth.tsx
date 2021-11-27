import { ReactChild } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

type RequireAuthProps = {
  children: ReactChild[];
};

export default function RequireAuth ({ children }: RequireAuthProps) {
  const user = useSelector((state: State) => state.session.user);
  const loaded = useSelector((state: State) => state.session.loaded);

  if (loaded && !user) return <Redirect to='/' />;
  return children;
}
