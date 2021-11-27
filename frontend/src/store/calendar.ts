const NEXT_MONTH = 'calendar/MONTH/NEXT';
const PREV_MONTH = 'calendar/MONTH/PREV';
const months: LiteralMonthContainer = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const NextMonth = () => ({
  type: NEXT_MONTH
});
export const PrevMonth = () => ({
  type: PREV_MONTH
});

export default function reducer (
  state: CalendarState = {
    month: (new Date()).getMonth(),
    year: (new Date()).getFullYear(),
    literalMonth: months[(new Date()).getMonth()]
  },
  { type }: CalendarAction
): CalendarState {
  switch (type) {
    case NEXT_MONTH:
      return {
        ...state,
        literalMonth: months[state.month === 11 ? 0 : state.month + 1],
        month: state.month === 11 ? 0 : state.month + 1,
        year: state.month === 11 ? state.year + 1 : state.year
      };
    case PREV_MONTH:
      return {
        ...state,
        literalMonth: months[state.month === 0 ? 11 : state.month - 1],
        month: state.month === 0 ? 11 : state.month - 1,
        year: state.month === 0 ? state.year - 1 : state.year
      };
    default:
      return state;
  }
}
