import React from "react";

import { Track } from "@/types";

import { PLAY_LIST_TYPE, usePlayerControl } from "@/stores/usePlayerControl";
import usePlayTimeStore from "@/stores/usePlayTimeStore";

import { TrackCard } from "@/components/cards";

interface PlayListProps {
  currentTrack: Track;
}

const PlayList = ({ currentTrack }: PlayListProps) => {
  const playList = usePlayerControl(state => state.playList);
  const playListType = usePlayerControl(state => state.playListType);
  const setCurrentTrack = usePlayerControl(state => state.setCurrentTrack);
  const setPlay = usePlayerControl(state => state.setPlay);

  const setPlayTime = usePlayTimeStore(state => state.setPlayTime);

  const clickHanlder = (track: Track) => {
    setPlayTime(0);
    setCurrentTrack(track);
    setPlay(true);
  };

  return (
    <>
      {}
      {playList.map((track: Track, index: number) => (
        <TrackCard
          key={index + track.trackTitle + playListType} // list 간의 전환이 있는 경우 index + track 조합이 같으면 같은 컴포넌트라 생각하는 것 같음.
          data={track}
          trackListType={playListType}
          focused={currentTrack.trackTitle === track.trackTitle}
          onClick={() => clickHanlder(track)}
        />
      ))}
    </>
  );
};

export default PlayList;
