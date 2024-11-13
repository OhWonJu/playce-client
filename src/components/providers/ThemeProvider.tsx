import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { createStore, StoreApi, useStore } from "zustand";

import { useLocalStorage } from "@/hooks/useLocalStorage";

type ThemeStore = {
  theme: "dark" | "light";
  toggleTheme: () => void;
};

export const ThemeContext = createContext<StoreApi<ThemeStore> | undefined>(
  undefined,
);

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [localTheme, setLocalTheme] = useLocalStorage("theme");

  const [themeStore] = useState(() =>
    createStore<ThemeStore>((set, get) => ({
      theme: localTheme
        ? (localTheme as "dark" | "light")
        : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",

      toggleTheme: () => {
        const { theme } = get();

        theme === "dark" ? setLocalTheme("light") : setLocalTheme("dark");

        return set({
          theme: theme === "dark" ? "light" : "dark",
        });
      },
    })),
  );

  useEffect(() => {
    document.getElementsByTagName("html")[0].classList.remove("light", "dark");
    document
      .getElementsByTagName("html")[0]
      .classList.add(themeStore.getState().theme);
  }, [themeStore.getState().theme]);

  return (
    <>
      <ThemeContext.Provider value={themeStore}>
        {children}
      </ThemeContext.Provider>
    </>
  );
};

export function useThemeStore<T>(selector: (state: ThemeStore) => T) {
  const context = useContext(ThemeContext);

  if (!context) throw new Error("ThemeContext.Provider is missing");

  return useStore(context, selector);
}

export default ThemeProvider;
