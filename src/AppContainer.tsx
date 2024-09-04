import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { getExpiresAt, getTitleFromRoute } from "@/lib/utils";
import { _GET } from "@/api/rootAPI";
import { useAuthStore } from "@/stores/useAuthStore";

import GlobalStyles from "@/styles/GlobalStyles";
import "@/styles/tailwind.css";

import App from "./App";
import RootLayout from "./RootLayout";
import useMeStore from "./stores/useMeStore";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/api/users";

const AppContainer = () => {
  const { isLogin, setIsLogin } = useAuthStore();
  const { initMe, setMe } = useMeStore();

  const flag = !!getExpiresAt();

  const { refetch, isLoading } = useQuery(getCurrentUser(!!flag));

  const preload = async () => {
    if (flag) {
      const currentUser = (await refetch()).data ?? null;

      if (!currentUser) {
        initMe();
        setIsLogin(false);
      } else {
        setMe(currentUser);
        setIsLogin(true);
      }
    } else {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    const prepare = async () => {
      try {
        await preload();
      } catch (e) {
        console.warn("PRELOAD_ERROR", e);
      } finally {
      }
    };
    prepare();
  }, [isLogin, flag]);

  if (isLoading) return null;

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
