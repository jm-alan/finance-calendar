import { JSXElementConstructor } from 'react';

const SET_MODAL = 'modal/CURRENT';
const TEARDOWN = 'modal/TEARDOWN';
const MOORING = 'modal/MOORING';

export const SetModal = (Current: JSXElementConstructor<any>) => ({
  type: SET_MODAL,
  Current
});

export const TearDown = () => ({
  type: TEARDOWN
});

export const SetMooring = (mooring: HTMLElement | null) => ({
  type: MOORING,
  mooring
});

export default function reducer (
  state = { Current: null, mooring: null },
  { type, Current, mooring }: ModalAction
) {
  switch (type) {
    case SET_MODAL:
      return { ...state, Current };
    case TEARDOWN:
      return { ...state, Current: null };
    case MOORING:
      return { ...state, mooring };
    default:
      return state;
  }
}
