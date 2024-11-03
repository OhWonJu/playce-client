import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { _GET } from "@/api/rootAPI";

import GlobalStyles from "@/styles/GlobalStyles";
import "@/styles/tailwind.css";

import App from "./App";
import RootLayout from "./RootLayout";
import ThemeProvider from "./components/providers/ThemeProvider";
import { HelmetHeader } from "./components";
import AuthProvider from "./components/providers/AuthProvider";
import ErrorFallback from "./errors/ErrorFallback";

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
    return (
      <section className="flex flex-col justify-center items-center mx-auto h-[100dvh]">
        <p>서버와의 연결에 실패했습니다.</p>
        <p>네트워크 연결 상태를 확인해주세요.</p>
        <p>이용에 불편을 드려 죄송합니다.</p>
      </section>
    );
    // throw new Error("Network Error");
  }

  return (
    <>
      <BrowserRouter>
        <HelmetProvider>
          <HelmetHeader />
          <ThemeProvider>
            <GlobalStyles />
            <RootLayout>
              <ErrorBoundary
                fallbackRender={fallbackProps => (
                  <ErrorFallback {...fallbackProps} />
                )}
              >
                <AuthProvider connectCheck={connectCheck}>
                  <App />
                </AuthProvider>
              </ErrorBoundary>
            </RootLayout>
          </ThemeProvider>
        </HelmetProvider>
      </BrowserRouter>
    </>
  );
};

export default AppContainer;
