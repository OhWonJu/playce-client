import { create } from "zustand";

// 일부 data를  request 할 때 필요한 ID state 관리
interface InputModeStoreProps {
  inputMode: boolean;
  setInputMode: (inputMode: boolean) => void;
}

const InputModeStore = create<InputModeStoreProps>(set => ({
  // STATE
  inputMode: false,

  //  ACTION
  setInputMode: (inputMode: boolean) => {
    set(state => ({ inputMode }));
  },
}));

export default InputModeStore;
