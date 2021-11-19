import { useSelector } from 'react-redux';
import Iphone from '../Iphone';
import Calendar from '../Calendar';
import './index.css';

export default function Home ({ asdf }) {
  const user = useSelector(state => state.session.user);

  return user
    ? (
      <Calendar />
      )
    : (
      <div>
        <h1>
          Hello! Please either log in or sign up!
        </h1>
        <div className='homepage_container'>
          <h1 className='homepage_header'>A smarter way to keep track of your finances</h1>
          <Iphone />
        </div>
      </div>
      );
}
