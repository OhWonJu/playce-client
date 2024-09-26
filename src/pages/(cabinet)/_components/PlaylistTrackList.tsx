import { TrackCard } from "@/components/cards";
import { cn } from "@/lib/utils";
import { Track } from "@/types";
import React from "react";

interface PlaylistTrackListProps {
  tracks: Track[];
  playlistId: string;
  isOwn: boolean;
  className?: string;
  trackListType: "LIST" | "QUEUE";
  onClick?: () => void;
}

const PlaylistTrackList = ({
  isOwn,
  playlistId,
  trackListType,
  tracks,
  className,
}: PlaylistTrackListProps) => {
  return (
    <ul className={cn("flex flex-col w-full space-y-2", className)}>
      {tracks.map((track, index) => (
        <TrackCard
          //@ts-ignore
          key={track.id}
          trackListId={playlistId}
          trackListType={trackListType}
          // onClick={}
          data={track}
          index={index}
        />
      ))}
    </ul>
  );
};

export default PlaylistTrackList;
