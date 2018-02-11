import * as React from 'react';
import './Hide.scss';
import {HTMLAttributes} from 'react';
import MediaQuery from 'react-responsive';
import {atLeast, lessThan, sizes} from '../../../utils/media-query';

interface HideProps extends HTMLAttributes<{}> {
  whenLessThan?: keyof typeof sizes;
  whenAtLeast?: keyof typeof sizes;
  children: any | any[];
}

export function Hide({whenLessThan, whenAtLeast, children}: HideProps): any {
  const query = (whenLessThan && lessThan(whenLessThan)) || (whenAtLeast && atLeast(whenAtLeast));
  return (<MediaQuery query={query}>{...children}</MediaQuery>);
}
