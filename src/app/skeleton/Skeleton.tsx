import * as React from 'react';
import {Switch, Route} from 'react-router';
import {Header} from "../layout/components/header/Header";
import {Footer} from "../layout/components/footer/footer";
import {JourneyContainer} from "../journey/JourneyContainer";
import './Skeleton.scss';

export const Skeleton = () => (
  <div className={'skeleton'}>
    <Header/>
    <Switch>
      <Route path={'/anfahrt'} component={JourneyContainer}/>
    </Switch>
    <Footer/>
  </div>

);
