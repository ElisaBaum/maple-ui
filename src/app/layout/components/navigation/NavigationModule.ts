import {Module} from "react.di";
import {NavigationService} from "./NavigationService";

@Module({
  providers: [NavigationService]
})
export class NavigationModule {}
