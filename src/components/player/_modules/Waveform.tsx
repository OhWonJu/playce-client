import { useCallback, useLayoutEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import Hls from "hls.js";

import { usePlayerToggle } from "@/stores/usePlayerToggleStore";
import usePlayTimeStore from "@/stores/usePlayTimeStore";
import { usePlayerControl } from "@/stores/usePlayerControl";

import { useThemeStore } from "@/components/providers/ThemeProvider";

const Waveform = () => {
  const theme = useThemeStore(state => state.theme);

  const { displayPlayer } = usePlayerToggle();
  const {
    play,
    repeatMode,
    forwardTrigger,
    setPlay,
    setCurrentTrack,
    currentTrack,
    playList,
    originTrackListId,
  } = usePlayerControl();
  const { playTime, setPlayTime, setTotalTime } = usePlayTimeStore();

  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef(null);
  const video = useRef<HTMLVideoElement>(null);
  const prevOriginTrackListIdRef = useRef(originTrackListId);
  const prevSec = useRef(0);

  // CREATE WAVE FORM ============================== //
  useLayoutEffect(() => {
    if (!waveformRef.current) return;

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      // progressColor: getComputedStyle(
      //   document.documentElement,
      // ).getPropertyValue("--primary"), // 개선 필요
      progressColor: theme === "light" ? "#212121" : "#fbfbf9",
      barHeight: 0.75,
      barWidth: 3,
      barRadius: 5,
      cursorWidth: 0,
      dragToSeek: true,
      media: video.current,
      backend: "WebAudio",
      peaks: [currentTrack.peaks],
    });

    const hls = new Hls();
    hls.loadSource(currentTrack.trackURL);
    hls.attachMedia(video.current);

    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      setTotalTime(currentTrack.trackTime);

      if (play) {
        wavesurfer.current.play();
      }
    });

    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.trackTitle,
        artist: currentTrack.artistName,
        album: currentTrack.albumName,
        artwork: [
          {
            src: currentTrack.albumArtURL + "_200w.webp",
            sizes: "200x200",
            type: "image/webp",
          },
          {
            src: currentTrack.albumArtURL + "_400w.webp",
            sizes: "400x400",
            type: "image/webp",
          },
          {
            src: currentTrack.albumArtURL + "_800w.webp",
            sizes: "800x800",
            type: "image/webp",
          },
        ],
      });

      navigator.mediaSession.setPositionState({
        duration: currentTrack.trackTime,
        playbackRate: video.current.playbackRate,
        position: video.current.currentTime,
      });
    }

    const syncPositionState = (playTime: number) => {
      if ("mediaSession" in navigator) {
        navigator.mediaSession.setPositionState({
          duration: currentTrack.trackTime,
          playbackRate: video.current.playbackRate,
          position:
            playTime > currentTrack.trackTime
              ? currentTrack.trackTime
              : playTime,
        });
      }
    };

    wavesurfer.current.on("seeking", (currentTime: number) => {
      setPlayTime(currentTime);
    });

    wavesurfer.current.on("timeupdate", (currentTime: number) => {
      const currentSec = Math.floor(currentTime);

      if (prevSec.current !== currentSec) {
        prevSec.current = currentSec;
        setPlayTime(currentTime);
        syncPositionState(currentTime);
      }
    });

    return () => {
      if (wavesurfer.current) {
        // WaveSurfer 인스턴스 파기
        wavesurfer.current.unAll();
        wavesurfer.current.destroy();
      }
    };
  }, [currentTrack, waveformRef.current, video.current, displayPlayer]);
  // ============================== CREATE WAVE FORM //

  // 음원 재생 완료 처리 ==================================== //
  const handleFinish = useCallback(() => {
    const currentIdx = playList.findIndex(
      el => el.trackTitle === currentTrack.trackTitle,
    );
    let nextIdx = 0;
    let stopLast = false;

    if (repeatMode === "REPEAT") {
      nextIdx = currentIdx;
      wavesurfer.current?.play();
    } else if (repeatMode === "REPEAT_ALL") {
      nextIdx = (currentIdx + 1) % playList.length;
    } else if (repeatMode === "NONE") {
      if (currentIdx < playList.length - 1) {
        nextIdx = currentIdx + 1;
      } else {
        stopLast = true;
      }
    }

    setPlayTime(0);

    if (!stopLast) {
      setCurrentTrack(playList[nextIdx]);
    } else setPlay(false);
  }, [currentTrack, playList, repeatMode]);

  useLayoutEffect(() => {
    if (!wavesurfer.current) return;

    wavesurfer.current.on("finish", handleFinish);

    return () => {
      wavesurfer.current.un("finish", handleFinish);
    };
  }, [wavesurfer.current, handleFinish]);
  // ==================================== 음원 재생 완료 처리 //

  // 트랙 변경 처리 ========================================= //
  const handleForwardTrigger = useCallback(() => {
    // forward 버튼에 의해 currentTrack 이 바뀌거나
    // playList 의 변화에 따른 플레이타임 갱신
    if (
      JSON.stringify(prevOriginTrackListIdRef.current) ===
      JSON.stringify(originTrackListId)
    ) {
      // 동일 playList의 경우
      // playTime 이 0 이상이라면 forward 액션이 아닌, 트랙 재호출 등의 액션일 수 있음
      // 연속적인 플레이를 위한 처리
      playTime > 0
        ? wavesurfer.current.setTime(playTime) // 지속적으로 플레이
        : wavesurfer.current.setTime(0); // Forward 액션이므로 플레이 시간 초기화
    } else {
      // playList기 다른 경우 플레이 시간 초기화
      wavesurfer.current.setTime(0);
    }

    prevOriginTrackListIdRef.current = originTrackListId;
  }, [originTrackListId, forwardTrigger]);

  useLayoutEffect(() => {
    if (wavesurfer.current) {
      handleForwardTrigger();
    }
  }, [handleForwardTrigger]);
  // ========================================= 트랙 변경 처리 //

  // 재생/정지 처리 ======================================================== //
  const handlePlay = async () => {
    if (!wavesurfer.current) return;

    const isPlaying = wavesurfer.current.isPlaying();
    if (play && !isPlaying) {
      await wavesurfer.current.play();
    } else if (!play && isPlaying) {
      await wavesurfer.current.pause();
    }
  };

  useLayoutEffect(() => {
    // load 되기 전 handlePlay() 실행을 막기 위해
    if (wavesurfer.current && wavesurfer.current.getDuration() > 0) {
      handlePlay();
    }
  }, [wavesurfer.current, play]);
  // ======================================================== 재생/정지 처리 //

  return (
    <>
      <div id="waveform" ref={waveformRef} />
      <video ref={video} playsInline style={{ display: "none" }} />
    </>
  );
};

export default Waveform;
