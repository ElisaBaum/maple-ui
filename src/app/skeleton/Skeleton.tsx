import * as React from 'react';
import {Switch, Route} from 'react-router';
import {JourneyContainer} from "../invitation/journey/JourneyContainer";
import {ApprovalContainer} from "../invitation/approval/ApprovalContainer";
import {RoomReservationContainer} from "../invitation/overnight-stay/RoomReservationContainer";
import {Navigation} from '../layout/components/navigation/Navigation';
import {NavigationItem} from "../layout/components/navigation/NavigationItem";
import {MusicRequestsContainer} from '../music-requests/MusicRequestsContainer';
import './Skeleton.scss';

export const JOURNEY_PATH = '/journey';
export const APPROVAL_PATH = '/approval';
export const OVERNIGHT_STAY_PATH = '/overnight-stay';
export const MUSIC_REQUESTS_PATH = '/music-requests';

export const Skeleton = () => (
  <div className={'skeleton'}>
    <Navigation>
      <NavigationItem target={JOURNEY_PATH} text='Anfahrt'/>
      <NavigationItem target={APPROVAL_PATH} text='Anmeldung'/>
      <NavigationItem target={OVERNIGHT_STAY_PATH} text='Übernachtung'/>
      <NavigationItem target={MUSIC_REQUESTS_PATH} text='Musikwünsche'/>
    </Navigation>
    <Switch>
      <Route path={JOURNEY_PATH} component={JourneyContainer}/>
      <Route path={APPROVAL_PATH} component={ApprovalContainer}/>
      <Route path={OVERNIGHT_STAY_PATH} component={RoomReservationContainer}/>
      <Route path={MUSIC_REQUESTS_PATH} component={MusicRequestsContainer}/>
    </Switch>
  </div>

);
