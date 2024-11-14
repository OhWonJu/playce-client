import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

import { _GET } from "@/api/rootAPI";

import GlobalStyles from "@/styles/GlobalStyles";
import "@/styles/tailwind.css";

import App from "./App";
import ThemeProvider from "./components/providers/ThemeProvider";
import ViewModeProvider from "./components/providers/ViewModeProvider";
import { Player } from "./components";

const StyledToastContainer = lazy(
  () => import("./components/Toastify/Toaster"),
);

const AppContainer = () => {
  const { isLoading: connectChecking, isError } = useQuery({
    queryKey: ["connect"],
    queryFn: async () => await _GET("/"),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    throwOnError: false,
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
  }

  return (
    <>
      <HelmetProvider>
        <ThemeProvider>
          <GlobalStyles />
          <ViewModeProvider />
          <Player />
          <Suspense>
            <StyledToastContainer />
          </Suspense>
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </>
  );
};

export default AppContainer;
