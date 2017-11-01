import {AxiosResponse} from 'axios';

export interface HttpResponseInterceptor {

  response(response: AxiosResponse): Promise<AxiosResponse> | AxiosResponse;
}
