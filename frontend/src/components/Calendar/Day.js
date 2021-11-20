export default function Day ({ date, gridColumnStart }) {
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
