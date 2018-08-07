import * as React from 'react';
import {Link} from "react-router-dom";
import {Button, ButtonType} from "../button/Button";

interface LinkButtonProps {
  target: string;
  children: any;
  type?: ButtonType;
  download?: boolean;
}

export function LinkButton({target, children, ...rest}: LinkButtonProps) {
  return (
    <Link to={target}>
      <Button htmlType="button"
              type="link"
              {...rest}>{children}</Button>
    </Link>
  );
}


export function ExtLinkButton({target, children, ...rest}: LinkButtonProps) {
  return (
    <a className={'btn btn-link'}
       target={'_blank'}
       href={target}
       {...rest}>{children}</a>
  );
}
