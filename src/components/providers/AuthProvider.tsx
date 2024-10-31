import { PropsWithChildren, useLayoutEffect, useMemo } from "react";
import { useQueue } from "@/stores/useQueue";

import { getCurrentUser, getQueue } from "@/api/users";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAuthStore } from "@/stores/useAuthStore";
import useMeStore from "@/stores/useMeStore";
import { useQuery } from "@tanstack/react-query";

const AuthProvider = ({
  connectCheck,
  children,
}: PropsWithChildren<{ connectCheck: any }>) => {
  const [expiresAt, setExpiresAt] = useLocalStorage("playce_expired_at");
  const { isLogin, setIsLogin } = useAuthStore();
  const { initMe, setMe } = useMeStore();
  const setQueue = useQueue(state => state.setQueue);

  const flag = useMemo(
    () => !!expiresAt && !!connectCheck,
    [expiresAt, connectCheck],
  );

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

  if (isLoading) return null;

  return <>{children}</>;
};

export default AuthProvider;
