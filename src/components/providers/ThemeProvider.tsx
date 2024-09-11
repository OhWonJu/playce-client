import { useLocalStorage } from "@/hooks/useLocalStorage";
import React, { useEffect, useMemo } from "react";

const ThemeProvider = () => {
  const [localTheme, _] = useLocalStorage("theme");

  const themeMode = useMemo((): string => {
    if (localTheme) return localTheme;
    else
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  }, [localTheme]);

  useEffect(() => {
    document.getElementsByTagName("html")[0].classList.remove("light", "dark");
    document.getElementsByTagName("html")[0].classList.add(themeMode);
  }, [themeMode]);

  return <></>;
};

export default ThemeProvider;
