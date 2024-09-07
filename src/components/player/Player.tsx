import React, { lazy, Suspense, useEffect } from "react";

import useViewModeStore from "@/stores/useViewMode";
import MainSheetProgressStore from "@/stores/mainSheetProgress";

import { KeyEventControler } from "./_modules";

const PlayerDesktopMode = lazy(() => import("./PlayerDesktopMode"));
const PlayerMobileView = lazy(() => import("./PlayerMobileMode"));

const Player = () => {
  const { viewMode } = useViewModeStore();
  const { setProgress } = MainSheetProgressStore();

  useEffect(() => {
    if (viewMode === "DESKTOP") {
      setProgress(0);
    }
  }, [viewMode]);

  return (
    <Suspense>
      <KeyEventControler />
      {viewMode !== "DESKTOP" ? <PlayerMobileView /> : <PlayerDesktopMode />}
    </Suspense>
  );
};

export default Player;
