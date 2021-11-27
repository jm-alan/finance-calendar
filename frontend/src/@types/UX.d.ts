declare type UXState = {
  modal: boolean;
  accountsDropdown: boolean;
};

declare type UXAction = {
  type: 'UX/modal/SHOW' | 'UX/modal/HIDE' | 'UX/accounts/EXPAND' | 'UX/accounts/COLLAPSE';
};
