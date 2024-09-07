import React, { useEffect } from "react";

import { usePlayerControl } from "@/stores/usePlayerControl";
import InputModeStore from "@/stores/inputModeSotre";

const KeyEventControler = () => {
  const play = usePlayerControl(state => state.play);
  const setPlay = usePlayerControl(state => state.setPlay);
  const { inputMode } = InputModeStore();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!inputMode && e.key === " ") {
        e.preventDefault();
        setPlay(!play);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [inputMode, play]);

  return <></>;
};

export default KeyEventControler;
