import * as React from 'react';
import {Link} from "react-router-dom";
import {Button} from "../button/Button";

interface LinkButtonProps {
  target: string;
  children: string;
}

export function LinkButton({target, children}: LinkButtonProps) {
  return (
    <Link to={target}>
      <Button htmlType="button" type="link">{children}</Button>
    </Link>
  );
}
