import React, { useMemo } from "react";

import { convertTime } from "@/lib/utils";
import { usePlayerToggle } from "@/stores/usePlayerToggleStore";
import { usePlayerControl } from "@/stores/usePlayerControl";

import { useQueue } from "@/stores/useQueue";

import { MusicCard } from "@/components";

const QueueCard = ({}: { key: string }) => {
  const { displayPlayer, onOpen } = usePlayerToggle();
  const { songCount, totalPlayTime, queue } = useQueue();
  const handlePlayListClick = usePlayerControl(
    state => state.handlePlayListClick,
  );

  const totalMin = useMemo(
    () => convertTime(totalPlayTime, "number")[0],
    [totalPlayTime],
  );

  const queueClickHandler = () => {
    if (queue.length < 1) return;

    if (!displayPlayer) {
      onOpen();
    }

    handlePlayListClick("QUEUE", { id: "queue", tracks: queue });
  };

  return (
    <MusicCard
      title={"My queue"}
      subTitle={`${songCount} songs • ${totalMin} mins`}
      size="md"
      playable
      playAction={queueClickHandler}
      onClick={() => console.log("just click")}
    />
  );
};

export default QueueCard;
