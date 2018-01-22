import * as React from 'react';
import * as classnames from 'classnames';
import './tile.scss';

interface TileProps {
  children: any | any[];
  centered?: boolean;
}

export function Tile({centered, children}: TileProps) {
  return (
    <div className={classnames('tile', {'tile-centered': centered})}>
      {children}
    </div>
  );
}

export function TileIcon({icon}) {
  return (
    <div className="tile-icon">
      <i className="centered material-icons">{icon}</i>
    </div>
  );
}

export function TileAvatar({imageUrl}) {
  return (
    <div className="tile-icon">
      <img className="centered" src={imageUrl} style={{height: '40px'}}/>
    </div>
  );
}

interface TileContentProps {
  children?: any | any[];
  title?: string;
  subtitle?: string;
}


export function TileContent({title, subtitle, children}: TileContentProps) {
  return (
    <div className="tile-content">
      {title && <div className="tile-title">{title}</div>}
      {subtitle && <div className="tile-subtitle text-gray">{subtitle}</div>}
      {children}
    </div>
  );
}

export function TileAction({children}) {
  return (
    <div className="tile-action">
      {children}
    </div>
  );
}
