import * as React from 'react';

export interface IAutoCompleteResultSection {
  sectionName: string;
  sectionKey: string;
  children: any[];
}

export function AutoCompleteResultSection({children}: IAutoCompleteResultSection) {
  return (
    <div>
      {...children}
    </div>
  );
}
