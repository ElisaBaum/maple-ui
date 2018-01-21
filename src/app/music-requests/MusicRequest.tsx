import * as React from 'react';
import '../layout/tiles.scss';

interface MusicRequestProps {
  id: number;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  deleteFn(id);
}

export function MusicRequest({id, title, subtitle, imageUrl, deleteFn}: MusicRequestProps) {
  const iconStyle = {
    height: '40px'
  };
  return (
    <div className="tile tile-centered">
      <div className="tile-icon">
          {
            imageUrl ?
              <img className="centered" src={imageUrl} style={iconStyle}/> :
              <i className="centered material-icons">library_music</i>
          }
      </div>
      <div className="tile-content">
        <div className="tile-title">{title}</div>

        {
          subtitle &&
          <div className="tile-subtitle text-gray">{subtitle}</div>
        }

      </div>
      <div className="tile-action">
        <button type="button" className="btn btn-link" onClick={() => deleteFn(id)}>
          <i className="material-icons">delete_forever</i>
        </button>
      </div>
    </div>
  );
}
