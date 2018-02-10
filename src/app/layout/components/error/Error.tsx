import * as React from 'react';
import {centered} from "../../decorators/center/center";
import {Logo} from "../logo/Logo";
import './Error.scss';

export const CenteredError = centered(Error);

interface ErrorProps {
  message: string;
  children?: any;
}

function Error({message, children}: ErrorProps) {
  return (
    <div className="error">
      <Logo className="logo"/>
      <div>{message}</div>
      {children}
    </div>
  );
}
