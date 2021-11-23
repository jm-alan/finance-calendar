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
                <div className='profile_pic'></div>
                <h1 className='name'>{user.firstName}</h1>
                <h2 className='profile_email'>{user.email}</h2>
            </div>
            <div className='accounts_container'>
                {/* <h1 className='accounts_header'>Accounts Summary</h1> */}
                {console.log(accounts)}
                {Object.values(accounts).map(account => {
                    return (
                        <div className='account_container'>
                            <h2 className='name'>{account.name}</h2>
                            <p className='balance'>${account.balance}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default Profile;
