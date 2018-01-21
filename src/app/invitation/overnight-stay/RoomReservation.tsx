import * as React from 'react';
import {ContentComponentProps} from "../../dynamic-content/ContentContainer";
import {RoomReservationData} from "./RoomReservationData";
import {HotelRoom} from "./HotelRoom";
import {FormRadioButton} from "../../layout/components/form/form-radiobutton/FormRadioButton";
import {Form} from "../../layout/components/form/Form";
import {FormButton} from "../../layout/components/form/form-button/FormButton";
import {Card} from "../../layout/components/card/Card";
import {Item} from "../../layout/components/item/Item";
import {Headline} from "../../layout/components/headline/Headline";

const formatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2
});

interface RoomReservationProps extends ContentComponentProps<RoomReservationData> {
  hotelRooms: HotelRoom[];
  reservedHotelRoom?: HotelRoom;
  loading: boolean;
  updateRoomReservation(room: HotelRoom);
  deleteRoomReservation();
}

export function RoomReservation(props: RoomReservationProps) {
  const {hotelRooms, reservedHotelRoom, updateRoomReservation, deleteRoomReservation, content, loading} = props;
  const {description, hint, deleteText} = content;

  return (
    <div>
      <Card>
        <Item>
          {description}
        </Item>
      </Card>
      <Card>
        <Headline text={content.hotelRooms.title} icon="local_hotel"/>
        {
          hotelRooms &&
          hotelRooms.map((room: HotelRoom) => (
              <FormRadioButton key={room.id}
                               label={`${room.description} ${formatter.format(room.price)}`}
                               name="hotelRooms"
                               onChange={({value}) => value && updateRoomReservation(room)}
                               value={!!reservedHotelRoom && reservedHotelRoom.id === room.id}/>
            )
          )
        }
        <Item>
          {content.hotelRooms.priceHint}
        </Item>
        {
          reservedHotelRoom &&
          <Form loading={loading} onSubmit={() => deleteRoomReservation()}>
            <Item>
              <FormButton>{deleteText}</FormButton>
            </Item>
          </Form>
        }
        <Item>
          <div>{content.hotelRooms.checkIn}</div>
          <div>{content.hotelRooms.checkOut}</div>
          <div>{content.hotelRooms.breakfast}</div>
        </Item>
      </Card>
      <Card>
        <Item>
          {hint}
        </Item>
      </Card>
    </div>
  );
}
