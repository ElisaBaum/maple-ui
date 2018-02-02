import * as React from 'react';
import * as classnames from 'classnames';
import './tile.scss';

interface TileProps {
  children: any | any[];
  centered?: boolean;
  className?: string;
}

export function Tile({centered, children, className}: TileProps) {
  return (
    <div className={classnames('tile', {'tile-centered': centered}, className)}>
      {children}
    </div>
  );
}

export function TileIconWrapper({children}) {
  return (
    <div className="tile-icon">
      {children}
    </div>
  );
}

export function TileIcon({icon}) {
  return (
    <TileIconWrapper>
      <i className="centered material-icons">{icon}</i>
    </TileIconWrapper>
  );
}

export function TileAvatar({imageUrl}) {
  return (
    <TileIconWrapper>
      <img className="title-avatar centered" src={imageUrl} style={{height: '40px'}}/>
    </TileIconWrapper>
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
      {subtitle && <div className="tile-subtitle">{subtitle}</div>}
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
