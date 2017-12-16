import * as React from 'react';
import {Component} from "react";
import {HotelRoom} from "./HotelRoom";
import {HotelRoomHttpService} from "./HotelRoomHttpService";
import {Inject, Module} from "react.di";
import {RoomReservation} from "./RoomReservation";
import {ContentContainer} from "../../dynamic-content/ContentContainer";
import {RoomReservationData} from "./RoomReservationData";
import {toast} from "react-toastify";

interface RoomReservationContainerState {
  hotelRooms: HotelRoom[];
  reservedHotelRoom?: HotelRoom;
  action?: Promise<any>;
}

@Module({
  providers: [
    HotelRoomHttpService,
  ]
})
export class RoomReservationContainer extends Component<{}, RoomReservationContainerState> {

  @Inject hotelRoomHttpService: HotelRoomHttpService;

  constructor(props) {
    super(props);
    this.state = {
      hotelRooms: []
    };
  }

  async componentWillMount() {
    this.setState({
      action: Promise.all([this.loadHotelRooms(), this.loadReservedHotelRoom()])
    });
  }

  async loadHotelRooms() {
    const hotelRooms = await this.hotelRoomHttpService.getHotelRooms();
    this.setState({hotelRooms});
  }

  async loadReservedHotelRoom() {
    try {
      const reservedHotelRoom = await this.hotelRoomHttpService.getReservedHotelRoom();
      this.setState({reservedHotelRoom});
    } catch (e) {
      if (e.response && e.response.status === 404) {
        return;
      }
    }
  }

  async updateRoomReservation(room: HotelRoom) {
    const reservedHotelRoom = await this.hotelRoomHttpService.reserveHotelRoom(room);
    this.setState({reservedHotelRoom});
  }

  async deleteRoomReservation() {
    try {
      await this.hotelRoomHttpService.deleteRoomReservation();
      this.setState({reservedHotelRoom: undefined});
      toast.dismiss();
    } catch (e) {
      toast.error(<p>Es ist ein Fehler aufgetreten. Bitte versuche es erneut.</p>);
    }
  }

  render() {
    const {hotelRooms, reservedHotelRoom, action} = this.state;
    return (
      <ContentContainer contentKey={'overnight-stay'} action={action} render={(content: RoomReservationData) => (
        <RoomReservation hotelRooms={hotelRooms}
                         reservedHotelRoom={reservedHotelRoom}
                         updateRoomReservation={(room) => this.updateRoomReservation(room)}
                         deleteRoomReservation={() => this.deleteRoomReservation()}
                         content={content}/>
      )}/>
    );
  }
}
