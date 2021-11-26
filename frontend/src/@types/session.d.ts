declare type SessionState = {
  user: any;
  loaded: boolean;
};

declare type SessionAction = {
  type: string;
  user?: any;
};
