import React, { useMemo } from "react";

import { convertTime } from "@/lib/utils";
import { usePlayerToggle } from "@/stores/usePlayerToggleStore";
import { usePlayerControl } from "@/stores/usePlayerControl";

import { useQueue } from "@/stores/useQueue";

import { MusicCard } from "@/components";
import { useNavigate } from "react-router";

const QueueCard = ({}: { key: string }) => {
  const navigate = useNavigate();
  const { displayPlayer, onOpen } = usePlayerToggle();
  const { songCount, totalPlayTime, queue, queueThumbNail } = useQueue();
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
      subTitle={`${songCount}곡 • ${totalMin}분`}
      imageUrl={
        queueThumbNail.length === 4 ? queueThumbNail : queueThumbNail[0]
      }
      size="md"
      playable
      playAction={queueClickHandler}
      onClick={() => navigate("/cabinet/queue")}
    />
  );
};

export default QueueCard;
