import * as React from 'react';
import {ContentComponentProps} from "../../dynamic-content/ContentContainer";
import {RoomReservationData} from "./RoomReservationData";
import {HotelRoom} from "./HotelRoom";
import {Paragraph} from "../../layout/components/content/Paragraph";
import {FormGroup} from "../../layout/components/form/FormGroup";
import {FormRadioButton} from "../../layout/components/form/form-radiobutton/FormRadioButton";
import {Form} from "../../layout/components/form/Form";
import {FormButton} from "../../layout/components/form/form-button/FormButton";

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
      <Paragraph>
        {description}
      </Paragraph>
      <Paragraph>
        {
          hotelRooms &&
            <FormGroup name={content.hotelRooms.title}>
              {
                hotelRooms.map((room: HotelRoom) => (
                  <FormRadioButton key={room.id}
                                   label={`${room.description} ${formatter.format(room.price)}`}
                                   name="hotelRooms"
                                   onChange={({value}) => value && updateRoomReservation(room)}
                                   value={!!reservedHotelRoom && reservedHotelRoom.id === room.id}/>
                  )
                )
              }
            </FormGroup>
        }
        {content.hotelRooms.priceHint}
        {
          reservedHotelRoom &&
          <Form loading={loading} onSubmit={() => deleteRoomReservation()}>
            <FormButton>{deleteText}</FormButton>
          </Form>
        }
      </Paragraph>
      <Paragraph>
        <div>{content.hotelRooms.checkIn}</div>
        <div>{content.hotelRooms.checkOut}</div>
        <div>{content.hotelRooms.breakfast}</div>
      </Paragraph>
      <Paragraph>
        {hint}
      </Paragraph>
    </div>
  );
}
