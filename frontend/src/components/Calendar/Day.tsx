import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetItemsByDate } from '../../store/items';

type DayProps = {
  date: string;
  gridColumnStart: number;
};

export default function Day ({ date, gridColumnStart }: DayProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetItemsByDate(date));
  }, [dispatch]);

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
