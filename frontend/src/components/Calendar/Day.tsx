import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetItemsByDate, RemoveItemsByDate } from '../../store/items';

type DayProps = {
  date: string;
  gridColumnStart: number;
};

export default function Day ({ date, gridColumnStart }: DayProps) {
  const dispatch = useDispatch();

  const selectedAccount = useSelector((state: State) => state.accounts.selected);
  const items = useSelector((state: State) => state.items.byDate[date]) ?? null;

  const dayRef = useRef<HTMLDivElement>(null);

  const [ready, setReady] = useState(false);
  const [height, setHeight] = useState<undefined | number>(undefined);
  const [width, setWidth] = useState<undefined | number>(undefined);

  const net = items && Object.values(items).reduce((acc, next) => acc + (next.is_expense ? -next.amount : +next.amount), 0);
  const neutralPositiveNegative = net === 0 ? '' : net > 0 ? ' positive' : ' negative';

  useEffect(() => {
    const boundingRect = dayRef.current && dayRef.current.getBoundingClientRect();
    if (boundingRect) {
      setWidth(boundingRect.width);
      setHeight(boundingRect.height);
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (ready) {
      const accountId = selectedAccount ? selectedAccount.id : 0;
      dispatch(GetItemsByDate(accountId, date));
    }
    return () => {
      dispatch(RemoveItemsByDate(date));
    };
  }, [dispatch, ready, date, selectedAccount]);

  return (
    <div
      ref={dayRef}
      className='calendar_day'
      style={{
        gridColumnStart,
        width,
        height
      }}
    >
      <div className='calendar_day-header'>
        <div className='calendar_date background-purple'>
          {date.split('/')[1]}
        </div>
        <div className='calendar_day-net'>
          Net: <span className={`daily-net${neutralPositiveNegative}`}>{net}</span>
        </div>
      </div>
      {items && (
        <div className='calendar_day-items-list'>
          {Object.values(items).map((item, idx) => (
            <div className='calendar_day-item-entry' key={idx}>
              <span className='item_entry_name'>
                {item.name}
              </span>
              <span className={`item_entry_amount${(item.is_expense) ? ' negative' : ' positive'}`}>
                {+item.amount}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
