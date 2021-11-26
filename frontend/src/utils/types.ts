import type { AccountState } from '../store/account';
import type { SessionState } from '../store/session';
import type { CalendarState } from '../store/calendar';
import type { ErrorState } from '../store/errors';
import type { ModalState } from '../store/modal';
import type { UXState } from '../store/UX';

export type State = {
  session: SessionState;
  accounts: AccountState;
  calendar: CalendarState;
  errors: ErrorState;
  modal: ModalState,
  UX: UXState;
};
