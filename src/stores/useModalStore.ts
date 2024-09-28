import { Track } from "@/types";
import { create } from "zustand";

export type ModalType =
  | "login"
  | "playlist"
  | "createPlaylist"
  | "cart"
  | "deleteUser";

interface ModalData {
  playlist?: {
    isAdd?: boolean;
    trackId?: string;
    track?: Track;
  };
  createPlayListData?: {
    fromPlaylist?: boolean;
  };
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData | null;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>(set => ({
  type: null,
  data: null,
  isOpen: false,
  onOpen: (type, data) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, data: null, isOpen: false }),
}));
