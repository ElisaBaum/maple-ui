import * as React from 'react';
import {Button as AntdButton} from 'antd';
import './Button.scss';

interface ButtonProps {
  htmlType: string;
  text: string;
  loading?: boolean;
}

export function Button({text, htmlType, loading}: ButtonProps) {
  return (
    <AntdButton className={'button'}
            type="primary"
            htmlType={htmlType}
            loading={loading}>
      {text}
    </AntdButton>
  );
}
