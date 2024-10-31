import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

import { _GET } from "@/api/rootAPI";

import GlobalStyles from "@/styles/GlobalStyles";
import "@/styles/tailwind.css";

import App from "./App";
import RootLayout from "./RootLayout";
import ThemeProvider from "./components/providers/ThemeProvider";
import { HelmetHeader } from "./components";
import AuthProvider from "./components/providers/AuthProvider";

const AppContainer = () => {
  const {
    data: connectCheck,
    isLoading: connectChecking,
    isError,
  } = useQuery({
    queryKey: ["connect"],
    queryFn: async () => await _GET("/"),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  if (connectChecking) return null;

  if (isError) {
    throw new Error("Network Error");
  }

  return (
    <>
      <BrowserRouter>
        <HelmetProvider>
          <HelmetHeader />
          <ThemeProvider>
            <GlobalStyles />
            <AuthProvider connectCheck={connectCheck}>
              <RootLayout>
                <App />
              </RootLayout>
            </AuthProvider>
          </ThemeProvider>
        </HelmetProvider>
      </BrowserRouter>
    </>
  );
};

export default AppContainer;
