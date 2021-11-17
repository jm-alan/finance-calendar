import { useSelector } from 'react-redux';
import Iphone from '../Iphone';

export default function Home () {
  const user = useSelector(state => state.session.user);

  return user
    ? (
      <h1>
        Hello, {user.username}!
      </h1>
      )
    : (
      <div>
      <h1>
        Hello! Please either log in or sign up!
      </h1>
      <Iphone />
      </div>
      );
}
