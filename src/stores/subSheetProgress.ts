import { create } from "zustand";

// 일부 data를  request 할 때 필요한 ID state 관리
interface SubSheetProgressStoreProps {
  progress: number;
  setProgress: (progress: number) => void;
}

const SubSheetProgressStore = create<SubSheetProgressStoreProps>(set => ({
  // STATE
  progress: 0,

  //  ACTION
  setProgress: (progress: number) => {
    set(state => ({ progress }));
  },
}));

export default SubSheetProgressStore;
