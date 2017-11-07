import {HttpResponseInterceptor} from './HttpResponseInterceptor';
import {HttpRequestInterceptor} from './HttpRequestInterceptor';

export type HttpInterceptor = Partial<HttpResponseInterceptor> & Partial<HttpRequestInterceptor<any>>;

export const HTTP_INTERCEPTOR_TOKEN = 'http-interceptor';
