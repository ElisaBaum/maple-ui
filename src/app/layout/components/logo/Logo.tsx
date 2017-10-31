import * as React from 'react';

import * as logo from './logo.svg';

interface LogoProps {
  className?: string;
}

export const Logo = (props: LogoProps) => (
  <img {...props} src={logo}/>
);
