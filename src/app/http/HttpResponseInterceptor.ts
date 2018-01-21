import {AxiosResponse} from 'axios';

export interface HttpResponseInterceptor {

  response(response: AxiosResponse): Promise<AxiosResponse> | AxiosResponse;
}


export interface HttpResponseErrorInterceptor {

  responseError(err: any): Promise<any> | any;
}
