import { create } from "zustand";

export type SidebarType = "my" | "setting";

interface SidebarData {}

interface SidebarStoreProps {
  type: SidebarType | null;
  data: SidebarData | null;
  isOpen: boolean;
  onOpen: (type: SidebarType, data?: SidebarData) => void;
  onClose: () => void;
}

export const useSidebar = create<SidebarStoreProps>(set => ({
  type: null,
  data: null,
  isOpen: false,
  onOpen: (type, data) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, data: null, isOpen: false }),
}));
