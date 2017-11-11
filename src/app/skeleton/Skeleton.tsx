import * as React from 'react';
import {Switch, Route} from 'react-router';
import {Header} from "../layout/components/header/Header";
import {Footer} from "../layout/components/footer/footer";
import {JourneyComponent} from "../journey/JourneyComponent";
import './Skeleton.scss';

export const Skeleton = () => (
  <div className={'skeleton'}>
    <Header/>
    <Switch>
      <Route path={'/anfahrt'} component={JourneyComponent}/>
    </Switch>
    <Footer/>
  </div>

);
