import * as React from 'react';
import {ToastContainer} from "react-toastify";

export function Toast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={false}
      newestOnTop={false}
      closeOnClick
    />
  );
}
