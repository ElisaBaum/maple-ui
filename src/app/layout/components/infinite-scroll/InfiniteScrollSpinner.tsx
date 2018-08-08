import * as React from "react";
import * as classnames from "classnames";
import './InfiniteScrollSpinner.scss';

export const InfiniteScrollSpinner = ({className}: { className? }) => (
  <div className={'infinite-scroll-spinner-wrapper'}>
    <div className={classnames('infinite-scroll-spinner', className)}>
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  </div>
);
