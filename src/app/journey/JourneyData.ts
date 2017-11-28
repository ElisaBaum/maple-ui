import {ContentData} from "../dynamic-content/ContentData";

export interface JourneyData extends ContentData {
  locationAddress: LocationAddress;

  journeyByPublicTransport: JourneyByTransportation;
  journeyByCar: JourneyByTransportation;

  apiToken: string;
}

export interface LocationAddress extends ContentData {
  name: string;
  street: string;
  houseNumber: string;
  postCode: string;
  city: string;
  gpsCoordinates: GPSCoordinates;
}

export interface GPSCoordinates extends ContentData {
  longitude: number;
  latitude: number;
}

export interface JourneyByTransportation extends ContentData {
  description: string;
}
