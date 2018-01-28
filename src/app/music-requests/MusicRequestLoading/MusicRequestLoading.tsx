import * as React from 'react';
import {Tile, TileIconWrapper} from '../../layout/components/tile/Tile';
import '../../layout/mixins/placeholder-shimmer.scss';
import './MusicRequestLoading.scss';

interface MusicRequestLoadingProps {
  hasSubtitle?: boolean;
}

export function MusicRequestLoading({hasSubtitle}: MusicRequestLoadingProps) {
  return (
    <Tile className={'music-request-loading'} centered>
      <TileIconWrapper>
        <div className={'placeholder-shimmer icon'}></div>
      </TileIconWrapper>
      <div className={'content'}>
        <div className={'placeholder-shimmer title'}></div>
        {hasSubtitle && <div className={'placeholder-shimmer subtitle'}></div>}
      </div>
    </Tile>
  );
}
