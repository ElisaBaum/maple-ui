import {Module} from 'react.di';
import {AuthService} from './AuthService';
import {HTTP_INTERCEPTOR_TOKEN} from '../http/HttpInterceptor';
import {CSRFTokenHttpInterceptor} from './CSRFTokenHttpInterceptor';
import {CommonModule} from '../common/CommonModule';
import {UserAuthHttpService} from './UserAuthHttpService';
import {UnAuthRedirectHttpInterceptor} from './UnAuthRedirectHttpInterceptor';

@Module({
  imports: [CommonModule],
  providers: [
    AuthService,
    UserAuthHttpService,
    {provide: HTTP_INTERCEPTOR_TOKEN, useClass: CSRFTokenHttpInterceptor},
    {provide: HTTP_INTERCEPTOR_TOKEN, useClass: UnAuthRedirectHttpInterceptor},
  ]
})
export class AuthModule {
}
