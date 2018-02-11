import {Module} from 'react.di';
import {UserHttpService} from './UserHttpService';
import {UserService} from './UserService';

@Module({
  providers: [
    UserHttpService,
    UserService,
  ]
})
export class UserModule {
}
