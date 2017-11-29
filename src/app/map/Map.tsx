import * as React from 'react';
import {GoogleMap, Marker} from "react-google-maps";
import withGoogleMap from 'react-google-maps/lib/withGoogleMap';
import withScriptjs from 'react-google-maps/lib/withScriptjs';
import './Map.scss';

interface TempMapProps {
  latitude: number;
  longitude: number;

}
interface MapProps extends TempMapProps {
  apiToken: string;
}

const getGoogleMapsUrl = apiToken => `https://maps.googleapis.com/maps/api/js?key=${apiToken}&v=3.exp&libraries=geometry,drawing,places`;

const TempMap = withScriptjs(withGoogleMap((props: TempMapProps) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: props.latitude, lng: props.longitude }}
  >
    <Marker position={{ lat: props.latitude, lng: props.longitude }}/>
  </GoogleMap>
));

export function Map({apiToken, longitude, latitude}: MapProps) {
  return (
    <TempMap latitude={latitude}
             longitude={longitude}
             googleMapURL={getGoogleMapsUrl(apiToken)}
             loadingElement={<div className={'map'}/>}
             containerElement={<div className={'map-container'}/>}
             mapElement={<div className={'map'}/>} />
  );
}
