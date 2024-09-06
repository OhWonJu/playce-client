import React from "react";

import { Track } from "@/types";
import { convertTime } from "@/lib/utils";
import { useQueue } from "@/hooks/useQueue";
import { usePlaylist } from "@/hooks/usePlaylist";

import Button from "../Button/Button";
import { DotMenu, Play, QueueList } from "../icons";
import { QueuePlayIconBox } from "./trackListCard.styles";

interface TrackListCardProps {
  index: number;
  data: Track;
  isOwn: boolean;
}

const TrackListCard = ({ index, data, isOwn }: TrackListCardProps) => {
  const { addTrack: addPlayListTrack, playListType } = usePlaylist();
  const { addTrack: addQueueList } = useQueue();

  const handleQueueAddActionClick = () => {
    playListType === "QUEUE" && addPlayListTrack(data);
    addQueueList(data);
  };

  return (
    <li
      key={index}
      className=" group relative flex items-center w-full h-[50px] hover:bg-neutral-100 dark:hover:bg-neutral-600"
    >
      {/* COL-1 */}
      <div className="w-[45px] h-full grid place-items-center mr-4">
        <span className="font-semibold">{index + 1}.</span>
      </div>
      {/* COL-2 */}
      <div className="flex flex-col">
        <span className="font-semibold truncate">{data.trackTitle}</span>
        <span className="font-semibold text-xs text-primary-foreground truncate">
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
            className="relative p-2 rounded-full"
            onClick={handleQueueAddActionClick}
          >
            <QueueList className="w-4 h-4" />
            <QueuePlayIconBox className="group-hover:bg-neutral-100 dark:group-hover:bg-neutral-600">
              <Play className="w-3 h-3" />
            </QueuePlayIconBox>
          </Button>
          <Button
            variant="plain"
            useRipple
            size="icon"
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
