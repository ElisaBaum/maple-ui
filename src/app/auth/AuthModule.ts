import {Module} from 'react.di';
import {AuthService} from './AuthService';
import {HTTP_INTERCEPTOR_TOKEN} from '../http/HttpInterceptor';
import {CSRFTokenHttpInterceptor} from './CSRFTokenHttpInterceptor';
import {CommonModule} from '../common/CommonModule';
import {UserAuthHttpService} from './UserAuthHttpService';

@Module({
  imports: [CommonModule],
  providers: [
    AuthService,
    UserAuthHttpService,
    {provide: HTTP_INTERCEPTOR_TOKEN, useClass: CSRFTokenHttpInterceptor},
  ]
})
export class AuthModule {
}
