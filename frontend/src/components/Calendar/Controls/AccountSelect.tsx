import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeselectAccount, getAllAccounts, SelectAccount } from '../../../store/accounts';
import { CollapseAccounts, ExpandAccounts } from '../../../store/UX';
import { useDocumentEvents } from '../../../utils/hooks';

export default function AccountSelect () {
  const dispatch = useDispatch();

  const accounts = useSelector((state: State) => Object.values(state.accounts.all));
  const accountsLoaded = useSelector((state: State) => state.accounts.loaded);
  const selectedAccount = useSelector((state: State) => state.accounts.selected);
  const expanded = useSelector((state: State) => state.UX.accountsDropdown);

  const { click } = useDocumentEvents();

  const expand = () => dispatch(ExpandAccounts());
  const select = (id: number) => () => id ? dispatch(SelectAccount(id)) : dispatch(DeselectAccount());

  useEffect(() => {
    if (!accountsLoaded) dispatch(getAllAccounts());
  }, [dispatch, accountsLoaded]);

  useEffect(() => {
    const collapse = () => dispatch(CollapseAccounts());
    if (expanded) return click(collapse);
  }, [dispatch, click, expanded]);

  return (
    <div className='account_selector-position-lock'>
      <div
        className='account_selector'
        style={{
          height: expanded
            ? (accounts.length + 1) * 30
            : 30
        }}
      >
        <div
          className='selected_account'
          onClick={expand}
        >
          {selectedAccount ? selectedAccount.name : 'All Accounts'}
        </div>
        <div
          className='accounts_list'
          style={{
            height: (accounts.length) * 30
          }}
        >
          {[
            { name: 'All Accounts', id: 0 }
          ].concat(accounts).filter(acc => selectedAccount ? selectedAccount.id !== acc.id : acc.id).map((acc, idx) => (
            <div
              key={idx}
              className='account_selectable'
              onClick={select(acc.id)}
            >
              {acc.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
