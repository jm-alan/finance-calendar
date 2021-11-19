import { useDispatch, useSelector } from 'react-redux';

import Day from './Day';

import './index.css';

export default function Calendar () {
  const dispatch = useDispatch();

  const year = useSelector(state => state.calendar.year);
  const month = useSelector(state => state.calendar.month);

  return (
    <div className='calendar_container'>
      <div className='weekday_container'>
        <div className='weekday'>Sun</div>
        <div className='weekday'>Mon</div>
        <div className='weekday'>Tue</div>
        <div className='weekday'>Wed</div>
        <div className='weekday'>Thu</div>
        <div className='weekday'>Fri</div>
        <div className='weekday'>Sat</div>
      </div>
      <div className='date_container'>
        {Object.entries((new Date(year, month)).toEnumeratedMonthObject()).map(([date, weekday], idx) => (
          <Day key={idx} date={date} gridColumnStart={weekday + 1} />
        ))}
      </div>
    </div>
  );
}
