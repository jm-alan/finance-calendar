import './index.css';

export default function Calendar () {
  return (
    <div className='calendar_container'>
      <div className='weekday_container'>
        <div className='day'>Sun</div>
        <div className='day'>Mon</div>
        <div className='day'>Tue</div>
        <div className='day'>Wed</div>
        <div className='day'>Thu</div>
        <div className='day'>Fri</div>
        <div className='day'>Sat</div>
      </div>
    </div>
  );
}
