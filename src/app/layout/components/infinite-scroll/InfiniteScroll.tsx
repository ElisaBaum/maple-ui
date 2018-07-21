import * as React from 'react';
import * as InfiniteScroller from 'react-infinite-scroller';

const getOffset = (page, limit) => page * limit;

export const InfiniteScroll = ({children, limit, loadMore, ...rest}) => (
  <InfiniteScroller pageStart={0}
                    loadMore={page => loadMore(getOffset(page - 1, limit))}
                    {...rest}>
    {...children}
  </InfiniteScroller>
);
