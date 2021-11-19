export default function Day ({ date, gridColumnStart }) {
  return (
    <div
      className='calendar_day'
      style={{
        gridColumnStart
      }}
    >
      {date.split('/')[1]}
    </div>
  );
}
