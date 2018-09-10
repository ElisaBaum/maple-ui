import * as React from 'react';
import * as classnames from 'classnames';
import './Modal.scss';

interface DialogAction {
  label: string;
  isPrimary?: boolean;
  onClick: () => any;
}

interface DialogProps {
  title: string;
  renderContent: () => any;
  onClose?: () => any;
  actions: DialogAction[];
}

export function Modal({title, renderContent, onClose, actions}: DialogProps) {
  return (
    <div className="modal-container" role="document">
      <div className="modal-header">
        {onClose && <button className="btn btn-clear float-right"
                            onClick={onClose}
                            aria-label="Close"></button>}
        <div className="modal-title h5">{title}</div>
      </div>
      <div className="modal-body">
        {renderContent()}
      </div>
      <div className="modal-footer">
        {actions.map(({label, isPrimary, onClick}, i) => (
          <button key={i}
                  className={classnames('btn', isPrimary ? 'btn-primary' : 'btn-link')}
                  onClick={onClick}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
