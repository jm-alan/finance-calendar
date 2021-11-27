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
