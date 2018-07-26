import * as React from 'react';
import * as classNames from 'classnames';
import {CSSProperties, HTMLAttributes} from 'react';
import './Image.scss';

type Position = 'center' | 'left' | 'top' | 'right' | 'bottom';

interface ImageProps extends HTMLAttributes<{}> {
  src: string;
  onLoad?: () => void;
  position?: Position;
  positionX?: Position;
  positionY?: Position;
  style?: CSSProperties;
  keepRatio?: boolean;
  size?: 'cover' | 'contain' | 'revert';
}

export function Image({src, size, position, positionX, positionY, className, onLoad, style, keepRatio, ...props}: ImageProps) {
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
                 className,
               )}
               style={{...style, backgroundImage: `url(${src})`}}>
    <img src={src}
         ref={ref => imgRef = ref}
         onLoad={() => {
           if (divRef) {
             if (imgRef && divRef.contains(imgRef)) {
               divRef.removeChild(imgRef);
               if (keepRatio) {
                 const {width, height} = getSize(imgRef.width, imgRef.height, divRef.offsetWidth, divRef.offsetHeight);
                 divRef.style.width = width;
                 divRef.style.height = height;
                 divRef.style.minWidth = 'auto';
                 divRef.style.minHeight = 'auto';
               }
             }
             divRef.style.opacity = '1';
           }
           onLoad && onLoad();
         }}/>
  </div>);
}

const getSize = (originalWidth, originalHeight, width, height) => {
  let newHeight = originalHeight * width / originalWidth;
  let newWidth = width;
  if (newHeight > height) {
    newHeight = height;
    newWidth = originalWidth * height / originalHeight;
  }
  return {height: `${String(newHeight)}px`, width: `${String(newWidth)}px`};
};
