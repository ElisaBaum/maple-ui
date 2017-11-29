import * as React from 'react';
import './Paragraph.scss';

interface SubTitleProps {
  headline?: string;
  headlineIcon?: string;
}

function SubTitle({headline, headlineIcon}: SubTitleProps) {
  if (headline && headlineIcon) {
      return (
        <div className={'sub-title'}>
          <i className="material-icons">{headlineIcon}</i>
          {headline}
        </div>
      );
  }

  if (headline) {
    return (
      <div className={'sub-title'}>{headline}</div>
    );
  }

  return null;
}

interface ParagraphProps extends SubTitleProps {
  children: any;
}

export function Paragraph({headline, headlineIcon, children}: ParagraphProps) {
  return (
    <div className={'content-paragraph'}>
      <SubTitle headline={headline} headlineIcon={headlineIcon}/>
      {...children}
    </div>
  );
}
