import * as React from 'react';
import * as logo from './logo.svg';
import * as logoHalf from './logo-half.svg';

interface LogoProps {
  className?: string;
  useHalf?: boolean;
}

export const Logo = ({className, useHalf}: LogoProps) => (
  <img className={className} src={useHalf ? logoHalf : logo}/>
);
