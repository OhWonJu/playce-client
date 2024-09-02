import { create } from "zustand";

interface playerToggleProps {
  displayPlayer: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePlayerToggle = create<playerToggleProps>(set => ({
  displayPlayer: false,

  onOpen: () => set({ displayPlayer: true }),
  onClose: () => set({ displayPlayer: false }),
}));
