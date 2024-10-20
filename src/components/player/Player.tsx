import React, { lazy, Suspense, useEffect } from "react";

import useViewModeStore from "@/stores/useViewMode";
import MainSheetProgressStore from "@/stores/mainSheetProgress";
import { usePlayerToggle } from "@/stores/usePlayerToggleStore";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import { KeyEventControler } from "./_modules";

const PlayerDesktopMode = lazy(() => import("./PlayerDesktopMode"));
const PlayerMobileView = lazy(() => import("./PlayerMobileMode"));
const PlayerBottomSheet = lazy(
  () => import("@/components/playerBottomSheet/PlayerBottomSheet"),
);

const Player = () => {
  const [theme, _] = useLocalStorage("theme");
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
