import * as React from 'react';
import './Divider.scss';

export interface IDividerProps {
  text?: string;
}

export function Divider({text}: IDividerProps) {
  return (
    <div className="custom-divider">
      {text === '' &&
      <div className="textless divider"></div>
      }
      {text !== '' &&
      <div
        className="text-divider divider"
        data-content={text}>
      </div>
      }
    </div>
  );
}
