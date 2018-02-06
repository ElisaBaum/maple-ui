import * as React from 'react';
import * as classNames from 'classnames';
import {HTMLAttributes} from 'react';
import './Image.scss';

type Position = 'center' | 'left' | 'top' | 'right' | 'bottom';

interface ImageProps extends HTMLAttributes<{}> {
  src: string;
  onLoad?: () => void;
  position?: Position;
  positionX?: Position;
  positionY?: Position;
  size?: 'cover' | 'contain' | 'revert';
}

export function Image({src, size, position, positionX, positionY, className, onLoad, ...props}: ImageProps) {
  let divRef: HTMLDivElement | null;
  let imgRef: HTMLImageElement | null;

  return (<div {...props}
               ref={ref => divRef = ref}
               className={classNames(
                 'image',
                 size && `image-${size}`,
                 position && `image-${position}`,
                 positionX && `image-${positionX}-x`,
                 positionY && `image-${positionY}-y`,
                 className
               )}
               style={{backgroundImage: `url(${src})`}}>
    <img src={src}
         ref={ref => imgRef = ref}
         onLoad={() => {
           if (divRef) {
             if (imgRef) {
               divRef.removeChild(imgRef);
             }
             divRef.style.opacity = '1';
           }
           onLoad && onLoad();
         }}/>
  </div>);
}
