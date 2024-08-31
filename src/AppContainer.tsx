import App from "./App";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import GlobalStyles from "@/styles/GlobalStyles";
import "@/styles/tailwind.css";

import { getTitleFromRoute } from "@/lib/utils";

const AppContainer = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{getTitleFromRoute(decodeURI(location.pathname))}</title>
        </Helmet>
        <GlobalStyles />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
};

export default AppContainer;
