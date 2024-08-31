import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import GlobalStyles from "@/styles/GlobalStyles";
import "@/styles/tailwind.css";

import { getTitleFromRoute } from "@/lib/utils";

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
            <App />
          </RootLayout>
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
};

export default AppContainer;
