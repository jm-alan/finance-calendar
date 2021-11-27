import type { Dispatch } from 'redux';
import type { CsrfFetch } from '../store/csrfetch';
import type { EnumeratedMonthObject } from '../utils/prototypes';

declare global {
  interface Window {
    store: any;
    dispatch: Dispatch<any>;
    csrfetch: CsrfFetch;
    findCookie (cookie: string): string;
  };

  interface Date {
    toEnumeratedMonthObject (): EnumeratedMonthObject;
  };

  type State = {
    session: SessionState;
    UX: UXState;
    modal: ModalState;
    errors: ErrorState;
    calendar: CalendarState;
    accounts: AccountState;
    items: ItemState;
  };
}

export default {};
