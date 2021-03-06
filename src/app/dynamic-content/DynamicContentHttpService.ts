import {Http} from '../http/Http';
import {Inject, Injectable} from "react.di";

@Injectable
export class DynamicContentHttpService<T> {

  constructor(@Inject private http: Http) {
  }

  async getDynamicContent(contentKey: string) {
    const dynamicContent = await this.http.get<{content: T}>(`/dynamic-content/${contentKey}`);
    return dynamicContent.data.content;
  }

}
