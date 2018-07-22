import * as React from 'react';
import * as classNames from 'classnames';
import {ChangeEvent, Component} from 'react';
import './FileSelect.scss';

interface IFileSelectButtonProps {
  children: string;
  accept?: string[];
  button?: boolean;
  itemButton?: boolean;
  onFilesChanged(fileList: FileList);
}

export class FileSelectButton extends Component<IFileSelectButtonProps, {}> {

  handleChange(e: ChangeEvent<any>) {
    e.preventDefault();

    const {onFilesChanged} = this.props;
    onFilesChanged(e.target.files);
  }

  render() {
    const {children, accept, button, itemButton} = this.props;
    return (
      <label className={classNames({
        'btn btn-primary btn-block': button,
        'file-select-button-item': itemButton,
      }, "file-select-button")}>
        <input type="file"
               accept={(accept || []).join(',')}
               multiple
               onChange={(e) => this.handleChange(e)}/>
        <span>{children}</span>
      </label>
    );
  }
}
