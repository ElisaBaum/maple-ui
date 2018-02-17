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
import {Tile, TileContent, TileIconWrapper} from '../../layout/components/tile/Tile';
import {Icon} from '../../layout/components/icon/Icon';
import {format} from '../../utils/currency';
import "./RoomReservation.scss";

interface RoomReservationProps extends ContentComponentProps<RoomReservationData> {
  hotelRooms: HotelRoom[];
  reservedHotelRoom?: HotelRoom;
  loading: boolean;

  updateRoomReservation(room: HotelRoom);

  deleteRoomReservation();
}

export function RoomReservation(props: RoomReservationProps) {
  const {hotelRooms, reservedHotelRoom, updateRoomReservation, deleteRoomReservation, content, loading} = props;
  const {contentTitle, description, hint, deleteText} = content;

  return (
    <div className="room-reservation">
      <Card>
        <Headline text={contentTitle.title} icon={contentTitle.icon} className="content-title"/>
        <Item>
          {description.map((text, i) => (<p key={i}>{text}</p>))}
        </Item>
      </Card>
      <Card>
        <Headline sub text={content.hotelRooms.title} icon={content.hotelRooms.icon}/>
        {
          hotelRooms &&
          hotelRooms.map((room: HotelRoom) => (
              <FormRadioButton key={room.id}
                               label={`${room.description} ${format(room.price)}`}
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
          <Tile>
            <TileIconWrapper>
              <Icon size={'lg'} name={'alarm'}/>
            </TileIconWrapper>
            <TileContent>
              <div>{content.hotelRooms.checkIn}</div>
              <div>{content.hotelRooms.checkOut}</div>
              <div>{content.hotelRooms.breakfast}</div>
            </TileContent>
          </Tile>
        </Item>
      </Card>
      <Card>
        <Item>
          <Tile>
            <TileIconWrapper>
              <Icon size={'lg'} name={'info'}/>
            </TileIconWrapper>
            <TileContent>
              {hint.map((text, i) => (<p key={i}>{text}</p>))}
            </TileContent>
          </Tile>
        </Item>
      </Card>
    </div>
  );
}
