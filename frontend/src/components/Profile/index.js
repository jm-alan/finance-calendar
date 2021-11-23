import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllAccounts } from '../../store/account';
import './index.css'

const Profile = () => {
    const dispatch = useDispatch();

    const accounts = useSelector(state => state.accounts);
    const user = useSelector(state => state.session.user);

        useEffect(() => {
            dispatch(getAllAccounts());
          }, [dispatch]);

    return (
        <div className='profile_page_container'>
            <div className='profile_info_container'>
                <div className='profile_pic profile'></div>
                <h1>{user.firstName}</h1>
                <h2>{user.email}</h2>
            </div>
            <div className='accounts_container profile'>
                <h1>Accounts Summary</h1>
                {console.log(accounts)}
                {Object.values(accounts).map(account => {
                    return (
                        <div>
                            <h2>{account.name}</h2>
                            <p>${account.balance}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default Profile;
