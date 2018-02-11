import {ContentData} from "../../dynamic-content/ContentData";

export interface RoomReservationData extends ContentData {

  contentTitle: {
    title: string;
    icon: string;
  };

  description: string[];
  hint: string[];
  deleteText: string;

  hotelRooms: {
    icon: string;
    title: string;
    checkIn: string;
    checkOut: string;
    breakfast: string;
    priceHint: string;
  };

}
