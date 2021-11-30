const SHOW_MODAL = 'UX/modal/SHOW';
const HIDE_MODAL = 'UX/modal/HIDE';
const EXPAND_ACCOUNTS = 'UX/accounts/EXPAND';
const COLLAPSE_ACCOUNTS = 'UX/accounts/COLLAPSE';

export const ShowModal = (): UXAction => ({
  type: SHOW_MODAL
});

export const HideModal = (): UXAction => ({
  type: HIDE_MODAL
});

export const ExpandAccounts = (): UXAction => ({
  type: EXPAND_ACCOUNTS
});

export const CollapseAccounts = (): UXAction => ({
  type: COLLAPSE_ACCOUNTS
});

export default function reducer (
  state: UXState = { modal: false, accountsDropdown: false, navBar: false },
  { type }: UXAction
): UXState {
  switch (type) {
    case SHOW_MODAL:
      return { ...state, modal: true };
    case HIDE_MODAL:
      return { ...state, modal: false };
    case EXPAND_ACCOUNTS:
      return { ...state, accountsDropdown: true };
    case COLLAPSE_ACCOUNTS:
      return { ...state, accountsDropdown: false };
    default:
      return state;
  }
}
