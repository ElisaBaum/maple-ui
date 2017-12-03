import {Module} from 'react.di';
import {Http} from './Http';

@Module({
  providers: [
    Http
  ]
})
export class HttpModule {
}
