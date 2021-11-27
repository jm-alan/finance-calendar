import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetItemsByDate, RemoveItemsByDate } from '../../store/items';

type DayProps = {
  date: string;
  gridColumnStart: number;
};

export default function Day ({ date, gridColumnStart }: DayProps) {
  const dispatch = useDispatch();

  const selectedAccount = useSelector((state: State) => state.accounts.selected);

  useEffect(() => {
    const accountId = selectedAccount ? selectedAccount.id : 0;
    dispatch(GetItemsByDate(accountId, date));
    return () => {
      dispatch(RemoveItemsByDate(date));
    };
  }, [dispatch, date, selectedAccount]);

  return (
    <div
      className='calendar_day'
      style={{
        gridColumnStart
      }}
    >
      <div className='calendar_date background-purple'>
        {date.split('/')[1]}
      </div>
    </div>
  );
}
