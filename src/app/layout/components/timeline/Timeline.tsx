import * as React from 'react';
import './Timeline.scss';

interface TimelineProps {
  children: any;
}

export function Timeline({children}: TimelineProps) {
  return (
    <div className="timeline">
      {children}
    </div>
  );
}
