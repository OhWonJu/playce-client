import { create } from "zustand";

export type WINDOW_VIEWS =
  | "INIT_VIEW"
  | "POLICY_PERSONAL"
  | "POLICY_STORE"
  | "POLICY_AGE"
  | "POLICY_AD";

interface UseWindowStoreProps {
  displayWindow: boolean;
  windowView: WINDOW_VIEWS;
  windowURL: string;

  openWindow: () => void;
  closeWindow: () => void;
  setWindowView: (view: WINDOW_VIEWS) => void;
  setWindowURL: (url: string) => void;
}

const useWindowStore = create<UseWindowStoreProps>(set => ({
  displayWindow: false,
  windowView: "INIT_VIEW",
  windowURL: "",

  openWindow: () => {
    set(state => ({
      ...state,
      displayWindow: true,
    }));
  },

  closeWindow: () => {
    set(state => ({
      ...state,
      displayWindow: false,
    }));
  },

  setWindowView: view => {
    set(state => ({
      ...state,
      windowView: view,
    }));
  },

  setWindowURL: url => {
    set(state => ({
      ...state,
      windowURL: url,
    }));
  },
}));

export default useWindowStore;
