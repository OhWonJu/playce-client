import React from "react";

import { Track } from "@/types";

import { usePlayerControl } from "@/stores/usePlayerControl";
import usePlayTimeStore from "@/stores/usePlayTimeStore";

import { TrackCard } from "@/components/cards";

const TrackList = () => {
  const {
    playList,
    playListType,
    originTrackListId,
    currentTrack,
    setCurrentTrack,
  } = usePlayerControl();
  const setPlayTime = usePlayTimeStore(state => state.setPlayTime);

  const clickHandler = (track: Track) => {
    setPlayTime(0);
    setCurrentTrack(track);
  };

  return (
    <section className="flex flex-col w-full h-full space-y-1">
      {playList.map((track: Track, index: number) => (
        <TrackCard
          key={index + track.trackTitle + playListType}
          data={track}
          trackListType={playListType}
          trackListId={originTrackListId}
          focused={currentTrack.trackTitle === track.trackTitle}
          onClick={() => clickHandler(track)}
        />
      ))}
    </section>
  );
};

export default TrackList;
