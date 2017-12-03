import {Module} from 'react.di';
import {UserHttpService} from './UserHttpService';

@Module({
  providers: [
    UserHttpService,
  ]
})
export class UserModule {
}
