import * as React from 'react';
import {ComponentType} from 'react';
import './center.scss';

interface CenterProps {
  width?: string;
}

export function centered<P extends object>(Component: ComponentType<P>): ComponentType<P & CenterProps> {
  return ({width, ...props}: any) => (
    <div className={'center'}>
      <div className={'centered-component'} style={{width: width || '300px'}}>
        <Component {...props}/>
      </div>
    </div>
  );
}
