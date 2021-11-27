/* eslint-disable import/no-anonymous-default-export */

import AccountSelect from './AccountSelect';
import MonthSelect from './MonthSelect';

export default () => (
  <div className='calendar_controls'>
    <AccountSelect />
    <MonthSelect />
  </div>
);
