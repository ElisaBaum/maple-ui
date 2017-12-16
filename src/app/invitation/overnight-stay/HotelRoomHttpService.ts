import {Http} from '../../http/Http';
import {Inject, Injectable} from 'react.di';
import {HotelRoom} from "./HotelRoom";

@Injectable
export class HotelRoomHttpService {

  constructor(@Inject private http: Http) {
  }

  async getHotelRooms() {
    const hotelRooms = await this.http.get('/hotel-rooms');
    return hotelRooms.data as HotelRoom[];
  }

  async getReservedHotelRoom() {
    const reservedRoom = await this.http.get('/users/me/hotel-rooms/reserved');
    return reservedRoom.data as HotelRoom;
  }

  async reserveHotelRoom(room: HotelRoom) {
    const reservedRoom = await this.http.post(`/users/me/hotel-rooms/${room.id}`);
    return reservedRoom.data as HotelRoom;
  }

  deleteRoomReservation() {
    return this.http.delete('/users/me/hotel-rooms/reserved');
  }

}
