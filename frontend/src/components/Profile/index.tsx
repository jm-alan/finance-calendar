import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { getAllAccounts } from '../../store/accounts';

import Account from '../Account';

import './index.css';

const Profile = () => {
  const dispatch = useDispatch();

  const accounts = useSelector((state: State) => state.accounts.all);
  const user = useSelector((state: State) => state.session.user);

  useEffect(() => {
    dispatch(getAllAccounts());
  }, [dispatch]);

  return (
    <div className='profile_page_container'>
      <div className='profile_info_container'>
        <div className='profile_pic'></div>
        <h1>{user.firstName}</h1>
        <h2>{user.email}</h2>
      </div>
      <div className='accounts_container'>
        <h1>Accounts Summary</h1>
        {Object.values(accounts).map((account, idx) => account && (
          <Account
          key={idx}
          account={account.name}
          balance={account.balance}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
