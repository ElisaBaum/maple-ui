import * as React from 'react';
import * as classnames from 'classnames';
import './Button.scss';

export type ButtonType = 'primary' | 'link' | 'inverse' | 'default';

interface ButtonProps {
  htmlType: string;
  children: any;
  block?: boolean;
  loading?: boolean;
  type?: ButtonType;
  className?: string;
  onClick?(e);
}

export function Button({children, className, htmlType, loading, block, type, ...rest}: ButtonProps) {
  return (
    <button {...rest} className={classnames(
      'btn',
      getButtonClass(type),
      {
        loading,
        'btn-block': block,
      },
      className
    )} type={htmlType}>{children}</button>
  );
}

function getButtonClass(type?: ButtonType) {
  const map = {primary: 'btn-primary', link: 'btn-link', inverse: 'btn-inverse', default: ''};
  return type ? map[type] : map.primary;
}
