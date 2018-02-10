import * as React from 'react';
import {ToastContainer} from "react-toastify";
import "./Toast.scss";

interface CloseButtonProps {
  closeToast?: any;
}

const CloseButton = ({closeToast}: CloseButtonProps) => (
  <i className="material-icons" onClick={closeToast}>clear</i>
);

export function Toast() {
  return (
    <ToastContainer
      toastClassName="toast"
      position="top-right"
      autoClose={false}
      newestOnTop={false}
      closeOnClick
      closeButton={<CloseButton/>}
    />
  );
}

