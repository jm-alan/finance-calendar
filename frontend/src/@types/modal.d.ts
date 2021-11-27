declare type ModalState = {
  Current: null | JSXElementConstructor<any>;
  mooring: null | HTMLElement;
};

declare type ModalAction = {
  type: string;
  Current?: JSXElementConstructor<any>;
  mooring?: HTMLElement | null;
};
