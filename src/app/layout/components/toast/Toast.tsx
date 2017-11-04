import * as React from 'react';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

export function Toast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={false}
      newestOnTop={false}
      closeOnClick={false}
    />
  );
}
