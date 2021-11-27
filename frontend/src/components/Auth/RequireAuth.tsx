import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

type RequireAuthProps = {
  children: JSX.Element;
};

export default function RequireAuth ({ children }: RequireAuthProps) {
  const user = useSelector((state: State) => state.session.user);
  const loaded = useSelector((state: State) => state.session.loaded);

  if (loaded && !user) return <Redirect to='/' />;
  return children;
}
