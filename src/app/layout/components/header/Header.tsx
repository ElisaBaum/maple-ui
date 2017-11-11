import * as React from 'react';
import './Header.scss';
import * as test from './test.jpg';

export const Header = () => (
    <div className={'meta-container'}>
      <img src={test} className="angle__content"/>
    </div>
);
