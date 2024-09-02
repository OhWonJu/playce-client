import { create } from "zustand";

export type VIEW_MODES = "INIT" | "MOBILE" | "TABLET" | "DESKTOP";

interface ViewModeProps {
  viewMode: VIEW_MODES;
  setViewMode: (viewMode: VIEW_MODES) => void;
}

const useViewModeStore = create<ViewModeProps>(set => ({
  viewMode: "INIT",
  setViewMode: (viewMode: VIEW_MODES) => {
    set({ viewMode });
  },
}));

export default useViewModeStore;
