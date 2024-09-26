import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useLocalStorage } from "@/hooks/useLocalStorage";

const OAuthCallbackPage = () => {
  const [searchParam] = useSearchParams();
  const expired = searchParam.get("expired");

  const [_, setExpiredAt] = useLocalStorage("playce_expired_at");

  const navigate = useNavigate();

  useEffect(() => {
    if (expired) {
      setExpiredAt(expired);
      navigate("/home");
    }
  }, [expired]);

  return (
    <main className="flex flex-col flex-1 h-full w-full sm:w-[420px] mx-auto px-4 sm:px-0 justify-center items-center pb-16"></main>
  );
};

export default OAuthCallbackPage;
