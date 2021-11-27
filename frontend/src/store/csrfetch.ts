/* eslint-disable import/no-anonymous-default-export */
import type { Dispatch } from 'redux';

import findCookie from '../utils/findCookie';
import { SetErrors } from './errors';

class CsrfFetch {
  private readonly options: [string, reqOpts];
  private readonly genericErrors: string[];
  private dispatch: Dispatch<ErrorAction> | (() => void) = () => {};

  constructor () {
    this.options = [
      '',
      {
        headers: {
          'Content-Type': 'application/json'
        },
        body: '',
        method: ''
      }
    ];
    this.genericErrors = [
      'Sorry, something went wrong. Please refresh the page and try again.'
    ];
  }

  public captureDispatch (dispatch: Dispatch<ErrorAction>) {
    this.dispatch = dispatch;
  }


  private __preFlight (opts: preflightOpts = { url: '', params: null, body: null }, method: string) {
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
  }

  private async __forwardFetch (opts: preflightOpts = { url: '', params: null, body: null }, method = 'GET') {
    this.__preFlight(opts, method);
    const res = await window.fetch(...this.options);
    try {
      if (res.status > 400) throw await res.json();
      return await res.json();
    } catch ({ errors }) {
      this.dispatch(SetErrors(errors || this.genericErrors));
      return {};
    }
  }

  async get (url: string, params?: paramsObj) {
    return await this.__forwardFetch({ url, params });
  }

  async post (url: string, body: bodyObj) {
    return await this.__forwardFetch({ url, body }, 'POST');
  }

  async patch (url: string, body: bodyObj) {
    return await this.__forwardFetch({ url, body }, 'PATCH');
  }

  async destroy (url: string, body?: bodyObj) {
    return await this.__forwardFetch({ url, body }, 'DELETE');
  }

  async restoreCSRF () {
    await this.get('/api/csrf/restore/');
  }
}

const csrfetch = new CsrfFetch();

export default csrfetch;
