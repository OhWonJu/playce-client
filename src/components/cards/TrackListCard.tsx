import React from "react";

import { _PATCH } from "@/api/rootAPI";

import { Track } from "@/types";
import { convertTime } from "@/lib/utils";
import { usePlayerControl } from "@/stores/usePlayerControl";

import { useQueue } from "@/stores/useQueue";

import Button from "../buttons/Button";
import { DotMenu, Play, QueueList } from "../icons";
import { QueuePlayIconBox } from "./trackListCard.styles";
import { useMutation } from "@tanstack/react-query";
import { updateQueue } from "@/api/queue";
import { useModal } from "@/stores/useModalStore";

interface TrackListCardProps {
  index: number;
  data: Track;
  isOwn: boolean;
}

const TrackListCard = ({ index, data, isOwn }: TrackListCardProps) => {
  const onOpen = useModal(state => state.onOpen);
  const addPlayListTrack = usePlayerControl(state => state.addTrack);
  const playListType = usePlayerControl(state => state.playListType);
  const addQueueList = useQueue(state => state.addTrack);

  const mutation = useMutation({
    mutationFn: updateQueue,
  });

  const handleQueueAddActionClick = () => {
    playListType === "QUEUE" && addPlayListTrack(data);
    addQueueList(data);
    mutation.mutate({ isAdd: true, trackId: data.id });
  };

  const handlePlaylistAddActionClick = () => {
    onOpen("playlist", {
      playlist: {
        isAdd: true,
        trackId: data.id,
        track: data,
      },
    });
  };

  return (
    <li
      key={index}
      className="group relative flex items-center w-full h-[50px] hover:bg-accent"
    >
      {/* COL-1 */}
      <div className="w-[45px] h-full grid place-items-center mr-4">
        <span className="font-bold">{index + 1}.</span>
      </div>
      {/* COL-2 */}
      <div className="flex flex-col">
        <span className="font-bold truncate">{data.trackTitle}</span>
        <span className="text-xs text-primary-foreground truncate">
          {data.artistName} • {convertTime(data.trackTime, "string")}
        </span>
      </div>
      {/* COL-3 */}
      {isOwn ? (
        <div className="absolute flex items-center justify-center right-0 h-full space-x-1">
          <Button
            variant="plain"
            useRipple
            size="icon"
            onClick={handleQueueAddActionClick}
            title="queuePlay"
            className="relative p-2 rounded-full"
          >
            <QueueList className="w-4 h-4" />
            <QueuePlayIconBox className="group-hover:bg-accent">
              <Play className="w-3 h-3 fill-primary stroke-primary" />
            </QueuePlayIconBox>
          </Button>
          <Button
            variant="plain"
            useRipple
            size="icon"
            onClick={handlePlaylistAddActionClick}
            title="utility"
            className="p-2 rounded-full"
          >
            <DotMenu className="w-4 h-4" />
          </Button>
        </div>
      ) : null}
    </li>
  );
};

export default TrackListCard;
