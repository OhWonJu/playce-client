import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import GlobalStyles from "@/styles/GlobalStyles";
import "@/styles/tailwind.css";

import { getTitleFromRoute } from "@/lib/utils";
import ModalProvider from "@/components/providers/ModalProvider";

import RootLayout from "./RootLayout";


const AppContainer = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{getTitleFromRoute(decodeURI(location.pathname))}</title>
        </Helmet>
        <GlobalStyles />
        <BrowserRouter>
          <RootLayout>
            <ModalProvider />
            <App />
          </RootLayout>
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
};

export default AppContainer;
