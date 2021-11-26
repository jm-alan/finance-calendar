declare type preflightOpts = {
  url: string;
  params?: any;
  body?: any;
};

declare type reqOpts = {
  headers: {
    'Content-Type': string;
    'XSRF-Token'?: string;
  };
  body: any;
  method: string;
};

declare type paramsObj = {
  [key: string]: any;
};
declare type bodyObj = {
  [key: string]: any;
};

declare type csrfetch = {
  options: [
    string,
    reqOpts
  ];
  genericErrors: string[];
  dispatch: Dispatch<ErrorAction> | (() => void);
  captureDispatch: (dispatch: Dispatch<ErrorAction>) => void;
  __preFlight: (opts: preflightOpts, method: string) => void;
  __forwardFetch: (opts: preflightOpts, method?: string) => Promise<any>;
  get: (url: string, params?: paramsObj) => Promise<any>;
  post: (url: string, body: bodyObj) => Promise<any>;
  patch: (url: string, body: bodyObj) => Promise<any>;
  destroy: (url: string, body?: bodyObj) => Promise<any>;
  restoreCSRF: () => Promise<void>;
};
