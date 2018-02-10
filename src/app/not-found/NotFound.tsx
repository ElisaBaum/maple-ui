import * as React from 'react';
import {CenteredError} from "../layout/components/error/Error";

export function NotFound() {
  return (
    <CenteredError message="Uups, die Seite wurde nicht gefunden."/>
  );
}
