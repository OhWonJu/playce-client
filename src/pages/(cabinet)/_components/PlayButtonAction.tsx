import React from "react";

import { Track } from "@/types";

import { usePlayerControl } from "@/stores/usePlayerControl";
import { usePlayerToggle } from "@/stores/usePlayerToggleStore";
import usePlayTimeStore from "@/stores/usePlayTimeStore";

import { Button } from "@/components";
import { Play } from "@/components/icons";

interface PlayButtonActionProps {
  playlistId: string;
  tracks: Track[];
}

const PlayButtonAction = ({ playlistId, tracks }: PlayButtonActionProps) => {
  const { displayPlayer, onOpen } = usePlayerToggle();
  const setPlayTime = usePlayTimeStore(state => state.setPlayTime);
  const handlePlayListClick = usePlayerControl(
    state => state.handlePlayListClick,
  );

  const playClickHandler = () => {
    if (!displayPlayer) {
      onOpen();
    }
    setPlayTime(0);
    handlePlayListClick(playlistId === "queue" ? "QUEUE" : "LIST", {
      id: playlistId,
      tracks,
    });
  };
  return (
    <div className="flex w-full space-x-2 row-start-4 row-span-1 sm:pt-3 lg:pt-1 xl:pt-3 ">
      <Button
        variant="flat"
        useRipple
        onClick={playClickHandler}
        className="flex justify-around items-center h-full text-base w-28"
      >
        <Play
          width="22"
          height="22"
          className="fill-secondary stroke-secondary"
        />
        <span className="font-semibold text-secondary">Play</span>
      </Button>
    </div>
  );
};

export default PlayButtonAction;
