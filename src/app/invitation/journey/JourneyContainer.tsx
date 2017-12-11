import * as React from 'react';
import {Journey} from "./Journey";
import {ContentContainer} from "../../dynamic-content/ContentContainer";

export function JourneyContainer() {
  return (
    <ContentContainer contentKey={'journey'} component={Journey}/>
  );
}
