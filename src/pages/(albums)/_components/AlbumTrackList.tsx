import React from "react";

import { Track } from "@/types";
import { cn } from "@/lib/utils";
import { TrackListCard } from "@/components";

interface AlbumTrackListProps {
  tracks: Track[];
  isOwn: boolean;
  className?: string;
}

const AlbumTrackList = ({ tracks, isOwn, className }: AlbumTrackListProps) => {
  return (
    <ul className={cn("flex flex-col w-full space-y-2", className)}>
      {tracks.map((track, index) => (
        <TrackListCard
          //@ts-ignore
          key={track.id}
          data={track}
          index={index}
          isOwn={isOwn}
        />
      ))}
    </ul>
  );
};

export default AlbumTrackList;
