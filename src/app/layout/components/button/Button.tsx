import * as React from 'react';
import * as classnames from 'classnames';
import 'spectre.css/dist/spectre.css';
import './Button.scss';

type ButtonType = 'primary' | 'link' | 'default';

interface ButtonProps {
  htmlType: string;
  text: string;
  loading?: boolean;
  type?: ButtonType;
}

export function Button({text, htmlType, loading, type}: ButtonProps) {
  return (
    <button className={classnames(
      'btn', getButtonClass(type), {loading}
    )} type={htmlType}>{text}</button>
  );
}

function getButtonClass(type?: ButtonType) {
  const map = {primary: 'btn-primary', link: 'btn-link', default: ''};
  return type ? map[type] : map.primary;
}
