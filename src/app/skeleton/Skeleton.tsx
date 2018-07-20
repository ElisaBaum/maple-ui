import * as React from 'react';
import {Switch, Route} from 'react-router';
import {JourneyContainer} from "../invitation/journey/JourneyContainer";
import {ApprovalContainer} from "../invitation/approval/ApprovalContainer";
import {RoomReservationContainer} from "../invitation/overnight-stay/RoomReservationContainer";
import {Navigation} from '../layout/components/navigation/Navigation';
import {NavigationItem} from "../layout/components/navigation/NavigationItem";
import {MusicRequestsContainer} from '../music-requests/MusicRequestsContainer';
import {QAndAContainer} from "../invitation/q-and-a/QAndAContainer";
import {ProcedureContainer} from "../invitation/procedure/ProcedureContainer";
import {NotFound} from "../not-found/NotFound";
import './Skeleton.scss';
import {GalleryModule} from '../gallery/GalleryModule';

export const JOURNEY_PATH = '/journey';
export const GALLERY_PATH = '/gallery';
export const APPROVAL_PATH = '/approval';
export const OVERNIGHT_STAY_PATH = '/overnight-stay';
export const MUSIC_REQUESTS_PATH = '/music-requests';
export const Q_AND_A_PATH = '/q-and-a';
export const PROCEDURE_PATH = '/procedure';

export const Skeleton = () => (
  <div className={'skeleton'}>
    <Navigation>
      <NavigationItem target={APPROVAL_PATH} text='Anmeldung'/>
      <NavigationItem target={PROCEDURE_PATH} text='Ablauf'/>
      <NavigationItem target={OVERNIGHT_STAY_PATH} text='Übernachtung'/>
      <NavigationItem target={JOURNEY_PATH} text='Anfahrt'/>
      <NavigationItem target={MUSIC_REQUESTS_PATH} text='Musikwünsche'/>
      <NavigationItem target={Q_AND_A_PATH} text='Fragen & Antworten'/>
      <NavigationItem target={GALLERY_PATH} text='Gallery'/>
    </Navigation>
    <Switch>
      <Route path={JOURNEY_PATH} component={JourneyContainer}/>
      <Route path={APPROVAL_PATH} component={ApprovalContainer}/>
      <Route path={GALLERY_PATH} component={GalleryModule}/>
      <Route path={OVERNIGHT_STAY_PATH} component={RoomReservationContainer}/>
      <Route path={MUSIC_REQUESTS_PATH} component={MusicRequestsContainer}/>
      <Route path={Q_AND_A_PATH} component={QAndAContainer}/>
      <Route path={PROCEDURE_PATH} component={ProcedureContainer}/>
      <Route component={NotFound}/>
    </Switch>
  </div>

);
