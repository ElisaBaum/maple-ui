import * as React from 'react';
import {ContentContainer} from "../layout/components/content-container/ContentContainer";
import {JourneyData} from "./JourneyData";
import {Component} from "react";

interface JourneyProps {
  content: JourneyData;
}

export class Journey extends Component<JourneyProps> {

  render() {
    const {headline, headlineIcon, journeyDescription} = this.props.content;

    return (
      <ContentContainer headline={headline} headlineIcon={headlineIcon}>
        <div>{journeyDescription}</div>
      </ContentContainer>
    );
  }
}
