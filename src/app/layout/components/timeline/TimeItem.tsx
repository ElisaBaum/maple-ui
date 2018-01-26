import * as React from 'react';
import './TimeItem.scss';

interface TimeItemProps {
  children: string;
}

export function TimeItem({children}: TimeItemProps) {
  return (
      <div className="time-item">{children}</div>

  );
}
