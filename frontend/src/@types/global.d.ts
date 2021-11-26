import type { Dispatch } from 'redux';
import type { csrfFetch } from '../store/csrfetch';
import type { EnumeratedmonthObject } from '../utils/prototypes';

declare global {
  interface Window {
    store: any;
    dispatch: Dispatch<any>;
    csrfetch: csrfFetch;
    findCookie (cookie: string): string;
  };

  interface Date {
    toEnumeratedMonthObject (): EnumeratedmonthObject;
  };
}

export default {};
