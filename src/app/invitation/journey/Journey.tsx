import * as React from 'react';
import {JourneyData} from "./JourneyData";
import {ContentComponentProps} from "../../dynamic-content/ContentContainer";
import {Map} from "../../map/Map";
import {Card} from "../../layout/components/card/Card";
import {Item} from "../../layout/components/item/Item";
import {Headline} from "../../layout/components/headline/Headline";
import './Journey.scss';

export function Journey({content}: ContentComponentProps<JourneyData>) {
  const {locationAddress, apiToken, journeyByPublicTransport, journeyByCar} = content;

  return (
    <div className={'journey'}>
      <Card>
        <Headline text={locationAddress.headline} icon={locationAddress.headlineIcon}/>
        <Item>
          <div>{locationAddress.name}</div>
          <div><span>{locationAddress.street} </span><span>{locationAddress.houseNumber}</span></div>
          <div><span>{locationAddress.postCode} </span><span>{locationAddress.city}</span></div>
        </Item>
      </Card>
      <Card>
        <Headline text={locationAddress.gpsCoordinates.headline} icon={locationAddress.gpsCoordinates.headlineIcon}/>
        <Item>
          <span>{locationAddress.gpsCoordinates.latitude}, </span>
          <span>{locationAddress.gpsCoordinates.longitude}</span>
        </Item>

        <Map apiToken={apiToken}
             longitude={locationAddress.gpsCoordinates.longitude}
             latitude={locationAddress.gpsCoordinates.latitude}/>

      </Card>

      <Card>
        <Headline text={journeyByPublicTransport.headline} icon={journeyByPublicTransport.headlineIcon}/>
        <Item>{journeyByPublicTransport.description}</Item>
      </Card>

      <Card>
        <Headline text={journeyByCar.headline} icon={journeyByCar.headlineIcon}/>
        <Item>{journeyByCar.description}</Item>
      </Card>
    </div>
  );
}
