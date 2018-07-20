import {Module} from 'react.di';
import {HTTP_INTERCEPTOR_TOKEN} from '../http/HttpInterceptor';
import {APIHttpInterceptor} from './APIHttpInterceptor';
import {HISTORY_TOKEN, history} from './history';
import {StorageService} from './StorageService';
import {S3UploadService} from './S3UploadService';

@Module({
  providers: [
    StorageService,
    S3UploadService,
    {provide: HISTORY_TOKEN, useValue: history},
    {provide: HTTP_INTERCEPTOR_TOKEN, useClass: APIHttpInterceptor},
  ]
})
export class CommonModule {
}
