import {Module} from 'react.di';
import {DynamicContentHttpService} from './DynamicContentHttpService';

@Module({
  providers: [
    DynamicContentHttpService
  ]
})
export class DynamicContentModule {
}
