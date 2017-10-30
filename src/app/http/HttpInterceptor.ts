import {HttpResponseInterceptor} from './HttpResponseInterceptor';
import {HttpRequestInterceptor} from './HttpRequestInterceptor';

export type HttpInterceptor = Partial<HttpResponseInterceptor> & Partial<HttpRequestInterceptor>;
