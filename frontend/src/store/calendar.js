const NEXT_MONTH = 'calendar/MONTH/NEXT';
const PREV_MONTH = 'calendar/MONTH/PREV';

export const NextMonth = () => ({
  type: NEXT_MONTH
});
export const PrevMonth = () => ({
  type: PREV_MONTH
});

export default function reducer (
  state = { month: (new Date()).getMonth() }, { type }
) {
  switch (type) {
    case NEXT_MONTH:
      return {
        ...state,
        month: state.month === 11 ? 0 : state.month + 1
      };
    case PREV_MONTH:
      return {
        ...state,
        month: state.month === 0 ? 11 : state.month - 1
      };
    default:
      return state;
  }
}
