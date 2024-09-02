import { create } from "zustand";

interface CurrentUserProps {
  currentPlayListId?: string;
  currentPlayTime: number;
  currentTrackId?: string;
  id?: string;
  image?: string;
  nickName?: string;
}

interface UseMeStoreProps extends CurrentUserProps {
  setMe: (data: CurrentUserProps) => void;
  initMe: () => void;
}

const useMeStore = create<UseMeStoreProps>((set) => ({
  id: undefined,
  nickName: undefined,
  image: undefined,
  currentPlayListId: undefined,
  currentPlayTime: 0,
  currentTrackId: undefined,

  setMe: data => {
    set(() => ({ ...data }));
  },

  initMe: () => {
    set(() => ({
      id: undefined,
      nickName: undefined,
      image: undefined,
      currentPlayListId: undefined,
      currentPlayTime: 0,
      currentTrackId: undefined,
    }));
  },
}));

export default useMeStore;
