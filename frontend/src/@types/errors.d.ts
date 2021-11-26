declare type ErrorState = {
  current: null | string[];
};

declare type ErrorAction = {
  type: string;
  current?: string[];
};
