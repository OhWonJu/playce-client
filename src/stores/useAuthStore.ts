import { create } from "zustand";

interface AuthStore {
  isLogin: boolean | undefined;
  setIsLogin: (flag: boolean) => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  isLogin: undefined,
  setIsLogin: flag => set({ isLogin: flag }),
}));
