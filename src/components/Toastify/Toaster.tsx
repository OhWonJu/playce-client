import { Container } from "./Toast.styles";

import "react-toastify/dist/ReactToastify.css";

export default function Toaster() {
  return (
    <Container
      position="bottom-center"
      autoClose={2500}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      closeButton={false}
      className="max-w-[90%] -translate-x-1/2 left-1/2 mb-6 sm:mb-0 space-y-4"
      // theme="light"
    />
  );
}
