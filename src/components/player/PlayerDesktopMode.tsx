import React from "react";
import { useMotionValue } from "framer-motion";

import { Track } from "@/types";
import {
  DESKTOP_PLAYER_WIDTH,
  NAV_HEIGHT,
  WAVE_FORM_HEIGHT,
} from "@/constants/uiSizes";

import { usePlayerControl } from "@/hooks/usePlayerControl";
import usePlayTimeStore from "@/stores/usePlayTimeStore";

import { DotMenu } from "@/components/icons";
import {
  AlbumArt,
  ForwardButton,
  PlayButton,
  PlayerMarquee,
  PlayTimer,
  RepeatButton,
  ShuffleButton,
} from "./_modules";
import Waveform from "./_modules/Waveform";

const PlayerDesktopMode = () => {
  const { play, currentTrack, playList, playListType, setCurrentTrack } =
    usePlayerControl();

  const setPlayTime = usePlayTimeStore(state => state.setPlayTime);

  const pinOpacity = useMotionValue(1);

  const clickHanlder = (track: Track) => {
    setPlayTime(0);
    setCurrentTrack(track);
  };

  return (
    <div
      className="__WRAPPER__ fixed right-0 flex flex-col px-4 shadow-inner"
      style={{
        width: DESKTOP_PLAYER_WIDTH,
        minHeight: 667,
        maxHeight: `calc(100vh - ${NAV_HEIGHT}px)`, // NAV 이격
        top: NAV_HEIGHT,
        zIndex: 60,
      }}
    >
      {/* HEADER */}
      <section
        className="__HEADER__ relative flex w-full justify-end items-center mb-1"
        style={{ minHeight: 50 }}
      >
        <div className="flex justify-center items-center h-full aspect-square rounded-full">
          <DotMenu className="w-5 h-5" />
        </div>
      </section>

      {/* CONTENT */}
      <section
        className="__CONTENT__ flex flex-col w-full h-full items-center"
        style={{ height: `calc(50vh) - ${25}px` }}
      >
        <div className="__ALBUM__ w-full aspect-square p-1">
          <AlbumArt
            artURL={currentTrack?.albumArtURL}
            isPlay={play}
            pinOpacity={pinOpacity}
          />
        </div>
        <div className="__PLAYER_CONTROLL__ flex flex-col w-full">
          {/* TRACK INFO */}
          <section className="__TRACK_INFO__ flex flex-col items-center w-full mb-2 overflow-hidden">
            <PlayerMarquee title={currentTrack?.trackTitle} />
            <span className="__MICRO_ARTIST__ font-bold text-base line-clamp-1 truncate">
              {currentTrack?.artistName}
            </span>
          </section>
          {/* WAVE FORM  */}
          <section
            className="__WAVE_FORM_CONTAINER__ relative mb-1 w-full overflow-hidden"
            style={{ height: WAVE_FORM_HEIGHT }}
          >
            <div className="absolute w-full h-full bottom-[15.5px]">
              <Waveform />
            </div>
          </section>
          {/* PLAY TIME INDICATOER */}
          <section className="flex w-full justify-between font-semibold text-xs">
            <PlayTimer />
          </section>
          {/* CONTROLLER */}
          <section className="__CONTROLLER__ flex w-full justify-between items-center ">
            <ShuffleButton />
            <ForwardButton isForward={false} />
            <PlayButton />
            <ForwardButton isForward={true} />
            <RepeatButton />
          </section>
        </div>
      </section>

      {/* TRACK LIST */}
      <section
        className="__TRACK_LIST__ flex flex-col w-full mt-4 pb-4 space-y-1 overflow-y-scroll scrollbar-hide"
        style={{ height: `calc(50vh - ${25}px)` }}
      >
        {/* {playList.map((track: Track, index: number) => (
          <TrackCard
            key={index + track.trackTitle + playListType} // list 간의 전환이 있는 경우 index + track 조합이 같으면 같은 컴포넌트라 생각하는 것 같음.
            data={track}
            trackListType={playListType}
            focused={currentTrack.trackTitle === track.trackTitle}
            clickHandler={() => clickHanlder(track)}
          />
        ))} */}
      </section>
    </div>
  );
};

export default PlayerDesktopMode;
