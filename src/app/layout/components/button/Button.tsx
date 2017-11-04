import * as React from 'react';
import {Button as AntdButton} from 'antd';
import './Button.scss';

interface ButtonProps {
  htmlType: string;
  text: string;
}

export function Button({text, htmlType}: ButtonProps) {
  return (
    <AntdButton className={'button'}
            type="primary"
            htmlType={htmlType}>
      {text}
    </AntdButton>
  );
}
