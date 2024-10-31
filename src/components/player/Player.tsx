import React, { lazy, Suspense, useEffect } from "react";

import useViewModeStore from "@/stores/useViewMode";
import MainSheetProgressStore from "@/stores/mainSheetProgress";
import { usePlayerToggle } from "@/stores/usePlayerToggleStore";

import { KeyEventControler } from "./_modules";
import { useThemeStore } from "../providers/ThemeProvider";

const PlayerDesktopMode = lazy(() => import("./PlayerDesktopMode"));
const PlayerMobileView = lazy(() => import("./PlayerMobileMode"));
const PlayerBottomSheet = lazy(
  () => import("@/components/playerBottomSheet/PlayerBottomSheet"),
);

const Player = () => {
  const theme = useThemeStore(state => state.theme);
  const { viewMode } = useViewModeStore();
  const { setProgress } = MainSheetProgressStore();
  const displayPlayer = usePlayerToggle(state => state.displayPlayer);

  useEffect(() => {
    if (viewMode === "DESKTOP") {
      setProgress(0);
    }
  }, [viewMode]);

  if (!displayPlayer) return null;

  return (
    <Suspense>
      <KeyEventControler />
      {viewMode !== "DESKTOP" ? (
        <>
          {/* @ts-ignore */}
          <PlayerMobileView key={theme} />
          <PlayerBottomSheet />
        </>
      ) : (
        <>
          {/* @ts-ignore */}
          <PlayerDesktopMode key={theme} />
        </>
      )}
    </Suspense>
  );
};

export default Player;
