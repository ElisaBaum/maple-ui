import * as React from 'react';
import {JourneyData} from "./JourneyData";
import {ContentComponentProps} from "../dynamic-content/ContentContainer";

export function Journey({content}: ContentComponentProps<JourneyData>) {
  return (
    <div>{content.journeyDescription}</div>
  );
}
