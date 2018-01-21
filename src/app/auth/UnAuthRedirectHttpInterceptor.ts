import {HttpResponseErrorInterceptor} from '../http/HttpResponseInterceptor';
import {HISTORY_TOKEN, History} from "../common/history";
import {Inject, Injectable} from 'react.di';
import {LOGIN_PATH} from '../App';

@Injectable
export class UnAuthRedirectHttpInterceptor implements HttpResponseErrorInterceptor {

  constructor(@Inject(HISTORY_TOKEN) private history: History) {
  }

  responseError(err: any) {
    if (err.response.status === 401 && this.history.location.pathname !== LOGIN_PATH) {
      return this.history.replace(LOGIN_PATH);
    }
    return Promise.reject(err);
  }
}
