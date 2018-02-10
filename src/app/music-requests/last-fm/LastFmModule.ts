import {Module} from 'react.di';
import {LastFmHttpService} from './LastFmHttpService';

@Module({
  providers: [LastFmHttpService]
})
export class LastFmModule {}
