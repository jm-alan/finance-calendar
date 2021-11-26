import { JSXElementConstructor } from 'react';

export type State = {
  session: {
    user: any,
    loaded: boolean;
  };
  accounts: {
    all: {
      [key: number]: any;
    },
    loaded: boolean;
  };
  calendar: {
    month: number,
    year: number;
  };
  errors: {
    current: null | string[];
  };
  modal: {
    Current: null | JSXElementConstructor,
    mooring: null | HTMLElement;
  },
  UX: {
    modal: boolean;
  };
};
