import { useSelector } from 'react-redux';
import Iphone from '../Iphone';
import './index.css';

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
        <div className='homepage_container'>
          <h1>A smarter way to keep track of your finances</h1>
          <Iphone />
        </div>
      </div>
      );
}
