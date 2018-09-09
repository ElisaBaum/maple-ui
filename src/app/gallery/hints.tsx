import {toast} from 'react-toastify';
import {Icon} from '../layout/components/icon/Icon';
import * as React from 'react';

const HINT_STORAGE_KEY = key => `foto_${key}_hint`;

export const displayUnseenHints = hints => {

  const displayHint = (hint, displayNextHint?) => () => toast.warn(<div>
    <Icon name={hint.icon} inverse style={{float: 'left', marginRight: '.5rem'}}/>
    {hint.text}
  </div>, {
    className: 'toast-info',
    onClose: () => {
      displayNextHint && displayNextHint();
      localStorage.setItem(HINT_STORAGE_KEY(hint.key), '1');
    },
  });

  const display = hints
    .filter(hint => !localStorage.getItem(HINT_STORAGE_KEY(hint.key)))
    .reverse()
    .reduce((displayNextHint, hint) => displayHint(hint, displayNextHint), undefined);

  if (display) display();
};
