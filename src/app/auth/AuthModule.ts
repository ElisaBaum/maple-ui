import {Module} from 'react.di';
import {AuthService} from './AuthService';
import {HTTP_INTERCEPTOR_TOKEN} from '../http/HttpInterceptor';
import {AuthHttpInterceptor} from './AuthHttpInterceptor';
import {CommonModule} from '../common/CommonModule';

@Module({
  imports: [CommonModule],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTOR_TOKEN, useClass: AuthHttpInterceptor},
  ]
})
export class AuthModule {
}
