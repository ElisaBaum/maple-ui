import * as React from 'react';
import {ChangeEvent, Component} from 'react';
import './FileSelect.scss';

interface IFileSelectButtonProps {
  children: string;
  accept?: string[];
  onFilesChanged(files: File[]);
}

export class FileSelectButton extends Component<IFileSelectButtonProps, {}> {

  handleChange(e: ChangeEvent<any>) {
    e.preventDefault();

    const {onFilesChanged} = this.props;
    onFilesChanged(e.target.files);
  }

  render() {
    const {children, accept} = this.props;
    return (
      <label className="file-select-button btn btn-primary">
        <input type="file"
               accept={(accept || []).join(',')}
               multiple
               onChange={(e) => this.handleChange(e)}/>
        <span>{children}</span>
      </label>
    );
  }
}
