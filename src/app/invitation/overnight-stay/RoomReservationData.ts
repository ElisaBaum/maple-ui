import {ContentData} from "../../dynamic-content/ContentData";

export interface RoomReservationData extends ContentData {

  description: string;
  hint: string;
  deleteText: string;

  hotelRooms: {
    title: string;
    checkIn: string;
    checkOut: string;
    breakfast: string;
    priceHint: string;
  };

}
