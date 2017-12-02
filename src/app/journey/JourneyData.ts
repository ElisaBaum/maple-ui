import {ContentData} from "../dynamic-content/ContentData";

export interface JourneyData extends ContentData {

  locationAddress: {
    headline: string;
    headlineIcon: string;
    name: string;
    street: string;
    houseNumber: string;
    postCode: string;
    city: string;

    gpsCoordinates: {
      headline: string;
      headlineIcon: string;
      longitude: number;
      latitude: number;
    };
  };

  journeyByPublicTransport: {
    headline: string;
    headlineIcon: string;
    description: string;
  };

  journeyByCar: {
    headline: string;
    headlineIcon: string;
    description: string;
  };

  apiToken: string;
}
