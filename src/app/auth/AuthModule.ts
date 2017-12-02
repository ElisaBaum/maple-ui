import {Module} from 'react.di';
import {AuthService} from './AuthService';
import {HTTP_INTERCEPTOR_TOKEN} from '../http/HttpInterceptor';
import {AuthHttpInterceptor} from './AuthHttpInterceptor';

@Module({
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTOR_TOKEN, useClass: AuthHttpInterceptor},
  ]
})
export class AuthModule {
}
