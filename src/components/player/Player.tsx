import React, { useEffect } from "react";

import { usePlayerControl } from "@/hooks/usePlayerControl";

import useViewModeStore from "@/stores/useViewMode";
import InputModeStore from "@/stores/inputModeSotre";
import MainSheetProgressStore from "@/stores/mainSheetProgress";
import PlayerDesktopMode from "./PlayerDesktopMode";
import PlayerMobileView from "./PlayerMobileMode";

const Player = () => {
  const { viewMode } = useViewModeStore();
  const { setProgress } = MainSheetProgressStore();
  const { play, setPlay } = usePlayerControl();
  const { inputMode } = InputModeStore();

  useEffect(() => {
    if (viewMode === "DESKTOP") {
      setProgress(0);
    }
  }, [viewMode]);

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

  return (
    <>{viewMode !== "DESKTOP" ? <PlayerMobileView /> : <PlayerDesktopMode />}</>
  );
};

export default Player;
