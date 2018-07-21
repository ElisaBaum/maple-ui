import * as React from 'react';
import * as classnames from 'classnames';
import './tile.scss';

interface TileProps {
  children: any | any[];
  centered?: boolean;
  className?: string;
  item?: boolean;
}

export function Tile({centered, children, className, item}: TileProps) {
  return (
    <div className={classnames('tile',
      {
        'tile-centered': centered,
        'tile-item': item,
      }, className)}>
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

export function TileAvatar({imageUrl, rounded}: {imageUrl, rounded?}) {
  return (
    <TileIconWrapper>
      <img className={classnames({
        'tile-avatar-rounded': rounded === undefined ? true : rounded,
      }, 'title-avatar centered')} src={imageUrl}/>
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

export function TileProgress({progress}) {
  return (
    <div className="tile-progress" style={{width: `${progress * 100}%`}}>
    </div>
  );
}
