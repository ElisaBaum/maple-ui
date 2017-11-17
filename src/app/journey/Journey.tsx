import * as React from 'react';
import {ContentContainer} from "../layout/components/content-container/ContentContainer";
import {JourneyData} from "./JourneyData";

interface JourneyProps {
  content: JourneyData;
}

export const Journey = ({content}: JourneyProps) => (
  <ContentContainer headline={content.headline} headlineIcon={content.headlineIcon}>
    <div>{content.journeyDescription}</div>
  </ContentContainer>
);
