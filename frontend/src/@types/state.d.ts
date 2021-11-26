declare interface State {
  session: SessionState;
  UX: UXState;
  modal: ModalState;
  errors: ErrorState;
  calendar: CalendarState;
  accounts: AccountState;
}
