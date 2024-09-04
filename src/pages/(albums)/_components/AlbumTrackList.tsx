import React from "react";

import { Track } from "@/types";
import { TrackListCard } from "@/components";

interface AlbumTrackListProps {
  tracks: Track[];
  isOwn: boolean;
}

const AlbumTrackList = ({ tracks, isOwn }: AlbumTrackListProps) => {
  return (
    <ul className="flex flex-col w-full space-y-2">
      {tracks.map((track, index) => (
        <TrackListCard
          //@ts-ignore
          key={track.id}
          data={track}
          index={index}
          isOwn={isOwn}
          trackListType="ALBUM"
        />
      ))}
    </ul>
  );
};

export default AlbumTrackList;
