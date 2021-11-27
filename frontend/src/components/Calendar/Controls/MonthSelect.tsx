import { useDispatch } from 'react-redux';

import { NextMonth, PrevMonth } from '../../../store/calendar';

export default function MonthSelect () {
  const dispatch = useDispatch();

  return (
    <div className='prev_next'>
      <button
        className='pop-button background-blue'
        onClick={() => dispatch(PrevMonth())}
      >
        Prev
      </button>
      <button
        className='pop-button background-blue'
        onClick={() => dispatch(NextMonth())}
      >
        Next
      </button>
    </div>
  );
}
