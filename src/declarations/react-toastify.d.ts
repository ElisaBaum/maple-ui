import {toast} from "react-toastify";

declare module 'react-toastify' {
  interface Toast {
    dismiss();
  }
}
