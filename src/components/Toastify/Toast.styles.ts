import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled(ToastContainer)`
  .Toastify__toast {
    font-size: 16px;
    padding: 0px 10px 0px 10px;
    z-index: 9999999;

    ${tw`flex items-center rounded-xl bg-neutral-100/80 dark:bg-neutral-700/70 backdrop-blur-md border border-neutral-100 dark:border-neutral-700/70 shadow-md`};
  }

  .Toastify__toast-icon {
    width: 22px;
    height: 22px;
  }

  .Toastify__toast--info {
  }

  .Toastify__toast--success {
  }

  .Toastify__toast--error {
  }

  .Toastify--animate {
    animation-fill-mode: both;
    animation-duration: 0.5s;
  }

  @keyframes Toastify__bounceIn {
    from,
    80%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    from {
      opacity: 0;
      transform: translate3d(0, 3000px, 0);
    }
    80% {
      opacity: 1;
      transform: translate3d(0, 10px, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes Toastify__bounceOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  .Toastify__bounce-enter--bottom-center {
    animation-name: Toastify__bounceIn;
  }

  .Toastify__bounce-exit--bottom-center {
    animation-name: Toastify__bounceOut;
  }
`;
