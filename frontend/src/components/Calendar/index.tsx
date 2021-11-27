import { useSelector } from 'react-redux';

import Day from './Day';
import Controls from './Controls';

import './index.css';

type DateTuple = [string, number];

export default function Calendar () {

  const year = useSelector((state: State) => state.calendar.year);
  const month = useSelector((state: State) => state.calendar.month);

  return (
    <div className='calendar_container'>
      <Controls />
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
        {Object.entries((new Date(year, month)).toEnumeratedMonthObject()).map(([date, weekday]: DateTuple, idx: number) => (
          <Day key={idx} date={date} gridColumnStart={weekday + 1} />
        ))}
      </div>
    </div>
  );
}
