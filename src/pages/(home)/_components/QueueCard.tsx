import React, { useMemo } from "react";

import { MusicCard } from "@/components";
import { convertTime } from "@/lib/utils";
import { useQueue } from "@/hooks/useQueue";
import { usePlayerToggle } from "@/stores/usePlayerToggleStore";
import { usePlayerControl } from "@/hooks/usePlayerControl";

const QueueCard = () => {
  const { displayPlayer, onOpen } = usePlayerToggle();
  const { songCount, totalPlayTime, queue } = useQueue();
  const {
    setPlay,
    setOriginTrackList,
    setCurrentTrack,
    setPlayListType,
    doShuffle,
    setPlayList,
    shuffle,
  } = usePlayerControl();

  const totalMin = useMemo(
    () => convertTime(totalPlayTime, "number")[0],
    [totalPlayTime],
  );

  const queueClickHandler = () => {
    if (queue.length < 1) return;

    if (!displayPlayer) {
      onOpen();
    }

    setPlayListType("QUEUE");

    setOriginTrackList("queue", queue);
    setCurrentTrack(queue[0]);

    if (shuffle) {
      doShuffle(queue);
    } else {
      setPlayList(queue);
    }

    setTimeout(() => setPlay(true), 800);
  };

  return (
    <MusicCard
      key={"my-queu"}
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
