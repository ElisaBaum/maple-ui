import {Http} from '../http/Http';
import {Inject, Injectable} from "react.di";
import {AuthInterceptorOptions} from "../auth/AuthHttpInterceptor";

@Injectable
export class DynamicContentHttpService<T> {

  constructor(@Inject private http: Http) {
  }

  async getDynamicContent(contentKey: string) {
    const dynamicContent = await this.http.get<T, AuthInterceptorOptions>(
      `/dynamicContent/${contentKey}`,
      {
        interceptOptions: {skipAuth: false}
      }
    );
    return dynamicContent;
  }

}
