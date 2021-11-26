const NEXT_MONTH = 'calendar/MONTH/NEXT';
const PREV_MONTH = 'calendar/MONTH/PREV';

export type CalendarState = {
  month: number;
  year: number;
};

type CalendarAction = {
  type: string;
};

export const NextMonth = () => ({
  type: NEXT_MONTH
});
export const PrevMonth = () => ({
  type: PREV_MONTH
});

export default function reducer (
  state = {
    month: (new Date()).getMonth(),
    year: (new Date()).getFullYear()
  },
  { type }: CalendarAction
) {
  switch (type) {
    case NEXT_MONTH:
      return {
        ...state,
        month: state.month === 11 ? 0 : state.month + 1,
        year: state.month === 11 ? state.year + 1 : state.year
      };
    case PREV_MONTH:
      return {
        ...state,
        month: state.month === 0 ? 11 : state.month - 1,
        year: state.month === 0 ? state.year - 1 : state.year
      };
    default:
      return state;
  }
}
