import { useLayoutEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

import { getCurrentUser, getQueue } from "@/api/users";
import { _GET } from "@/api/rootAPI";

import { useAuthStore } from "@/stores/useAuthStore";
import useMeStore from "@/stores/useMeStore";
import { useQueue } from "./stores/useQueue";
import { useLocalStorage } from "./hooks/useLocalStorage";

import GlobalStyles from "@/styles/GlobalStyles";
import "@/styles/tailwind.css";

import App from "./App";
import RootLayout from "./RootLayout";
import ThemeProvider from "./components/providers/ThemeProvider";
import { HelmetHeader } from "./components";

const AppContainer = () => {
  const [expiresAt, setExpiresAt] = useLocalStorage("playce_expired_at");

  const { isLogin, setIsLogin } = useAuthStore();
  const { initMe, setMe } = useMeStore();

  const setQueue = useQueue(state => state.setQueue);

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

  const flag = !!expiresAt && !!connectCheck;

  const { refetch, isLoading } = useQuery(getCurrentUser(!!flag));
  const { data: queueData } = useQuery(getQueue(isLogin));

  const preload = async () => {
    if (flag) {
      const currentUser = (await refetch()).data ?? null;

      if (!currentUser) {
        initMe();
        setIsLogin(false);
        setExpiresAt("");
      } else {
        setMe(currentUser);
        setIsLogin(true);
      }
    } else {
      setIsLogin(false);
    }
  };

  useLayoutEffect(() => {
    const prepare = async () => {
      try {
        await preload();
      } catch (e) {
        console.warn("PRELOAD_ERROR", e);
      } finally {
        sessionStorage.clear();
      }
    };
    prepare();
  }, [isLogin, flag]);

  useLayoutEffect(() => {
    if (queueData) {
      setQueue(
        queueData.tracks,
        queueData.totalPlayTime,
        queueData.queueThumbNail,
      );
    }
  }, [queueData]);

  if (connectChecking || isLoading) return null;

  if (isError) {
    // TODO : 서버 연결이 불가능하다는 안내 출력
    console.log("SERVER CONNECT FAILED");
    return (
      <div className="w-screen h-[100dvh] grid content-center text-center">
        서버와의 연결에 실패했습니다.
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <HelmetProvider>
          <HelmetHeader />
          <ThemeProvider />
          <GlobalStyles />
          <RootLayout>
            <App />
          </RootLayout>
        </HelmetProvider>
      </BrowserRouter>
    </>
  );
};

export default AppContainer;
