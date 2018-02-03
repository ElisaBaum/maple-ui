import * as React from 'react';
import './TimelineItem.scss';

interface TimelineItemProps {
  children: any;
}

export function TimelineItem({children}: TimelineItemProps) {
  return (
    <div className="timeline-item">
      {children}
    </div>

  );
}
