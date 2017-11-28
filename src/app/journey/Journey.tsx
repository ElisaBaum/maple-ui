import * as React from 'react';
import {JourneyData} from "./JourneyData";
import {ContentComponentProps} from "../dynamic-content/ContentContainer";
import {Map} from "../map/Map";
import {Paragraph} from "../layout/components/content/Paragraph";

export function Journey({content}: ContentComponentProps<JourneyData>) {
  const {locationAddress, apiToken, journeyByPublicTransport, journeyByCar} = content;

  return (
    <div className={'journey'}>
      <Paragraph headline={locationAddress.headline} headlineIcon={locationAddress.headlineIcon}>
        <div>{locationAddress.name}</div>
        <div><span>{locationAddress.street} </span><span>{locationAddress.houseNumber}</span></div>
        <div><span>{locationAddress.postCode} </span><span>{locationAddress.city}</span></div>
      </Paragraph>

      <Paragraph headline={locationAddress.gpsCoordinates.headline}
                 headlineIcon={locationAddress.gpsCoordinates.headlineIcon}>
        <div>
          <span>{locationAddress.gpsCoordinates.latitude}, </span>
          <span>{locationAddress.gpsCoordinates.longitude}</span>
        </div>
      </Paragraph>

      <Paragraph>
        <Map apiToken={apiToken}
             longitude={locationAddress.gpsCoordinates.longitude}
             latitude={locationAddress.gpsCoordinates.latitude}/>
      </Paragraph>

      <Paragraph headline={journeyByPublicTransport.headline}
                 headlineIcon={journeyByPublicTransport.headlineIcon}>
        <div>{journeyByPublicTransport.description}</div>
      </Paragraph>

      <Paragraph headline={journeyByCar.headline}
                 headlineIcon={journeyByCar.headlineIcon}>
        <div>{journeyByCar.description}</div>
      </Paragraph>
    </div>
  );
}
