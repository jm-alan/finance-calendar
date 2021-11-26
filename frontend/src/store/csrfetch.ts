/* eslint-disable import/no-anonymous-default-export */
import type { Dispatch } from 'redux';

import findCookie from '../utils/findCookie';
import { SetErrors } from './errors';

type preflightOpts = {
  url: string;
  params?: any;
  body?: any;
};

type reqOpts = {
  headers: {
    'Content-Type': string;
    'XSRF-Token'?: string;
  };
  body: any;
  method: string;
};

type paramsObj = {
  [key: string]: any;
};
type bodyObj = {
  [key: string]: any;
};

export type csrfFetch = {
  options: [
    string,
    reqOpts
  ];
  genericErrors: string[];
  dispatch: Dispatch<any> | (() => void);
  captureDispatch: (dispatch: Dispatch<any>) => void;
  __preFlight: (opts: preflightOpts, method: string) => void;
  __forwardFetch: (opts: preflightOpts, method?: string) => Promise<any>;
  get: (url: string, params?: paramsObj) => Promise<any>;
  post: (url: string, body: bodyObj) => Promise<any>;
  patch: (url: string, body: bodyObj) => Promise<any>;
  delete: (url: string, body?: bodyObj) => Promise<any>;
  restoreCSRF: () => Promise<void>;
};

const csrfetch: csrfFetch = {
  dispatch: () => {},

  options: [
    '',
    {
      headers: {
        'Content-Type': 'application/json'
      },
      body: '',
      method: ''
    }
  ],

  genericErrors: ['Sorry, something went wrong. Please refresh the page and try again.'],

  captureDispatch (dispatch: Dispatch<any>) {
    this.dispatch = dispatch;
  },

  __preFlight (opts = { url: '', params: null, body: null }, method) {
    this.options[1].headers['XSRF-Token'] = findCookie('XSRF-TOKEN');
    if (method === 'GET') delete this.options[1].body;
    this.options[0] = opts.url;
    this.options[1] = { ...this.options[1], method };
    this.options[0][this.options[0].length - 1] !== '/' && (this.options[0] = `${opts.url}/`);
    if (opts.params) {
      opts.url += '?';
      for (const key in opts.params) opts.url += `&${key}=${opts.params[key]}`;
    }
    if (opts.body) this.options[1].body = JSON.stringify(opts.body);
  },

  async __forwardFetch (opts = { url: '', params: null, body: null }, method = 'GET') {
    this.__preFlight(opts, method);
    const res = await window.fetch(...this.options);
    try {
      if (res.status > 400) throw await res.json();
      return await res.json();
    } catch ({ errors }) {
      this.dispatch(SetErrors(errors || this.genericErrors));
      return {};
    }
  },

  async get (url, params) {
    return await this.__forwardFetch({ url, params });
  },

  async post (url, body) {
    return await this.__forwardFetch({ url, body }, 'POST');
  },

  async patch (url, body) {
    return await this.__forwardFetch({ url, body }, 'PATCH');
  },

  async delete (url, body) {
    return await this.__forwardFetch({ url, body }, 'DELETE');
  },

  async restoreCSRF () {
    await this.get('/api/csrf/restore/');
  }
};

export default csrfetch;
