import { create } from "zustand";

// 일부 data를  request 할 때 필요한 ID state 관리
interface PlayTimeStoreProps {
  totalTime: number;
  playTime: number;
  getPlayTime: () => number;
  setPlayTime: (playTime: number) => void;
  setTotalTime: (totalTime: number) => void;
}

const usePlayTimeStore = create<PlayTimeStoreProps>((set, get) => ({
  totalTime: 0,
  playTime: 0,

  getPlayTime: () => get().playTime,

  setPlayTime: (playTime: number) => {
    set(state => ({ playTime }));
  },

  setTotalTime: (totalTime: number) => {
    set(state => ({ totalTime }));
  },
}));

export default usePlayTimeStore;
