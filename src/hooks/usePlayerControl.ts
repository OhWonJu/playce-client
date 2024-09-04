import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AlbumInfo, Track } from "@/types";

import type { RootState } from "@/stores/reduxStore";

import { playerControlActions } from "@/stores/reducers";
import {
  PLAY_LIST_TYPE,
  PLAYER_REPEAT_MODE,
} from "@/stores/reduxTypes/playerControlType";

export const usePlayerControl = () => {
  const dispatch = useDispatch();

  const {
    play,
    shuffle,
    repeatMode,
    forwardMode,
    forwardTrigger,
    originTrackId,
    originTrackList,
    playList,
    playListType,
    currentTrack,
    totalTime,
  } = useSelector(({ playerControl }: RootState) => playerControl);

  const setPlay = useCallback(
    (play: boolean) =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "SET_PLAY",
          play,
        }),
      ),
    [dispatch],
  );

  const setShuffle = useCallback(
    (shuffle: boolean) =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "SET_SHUFFLE",
          shuffle,
        }),
      ),
    [dispatch],
  );

  const setRepeatMode = useCallback(
    (repeatMode: PLAYER_REPEAT_MODE) =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "SET_REPEAT_MODE",
          repeatMode,
        }),
      ),
    [dispatch],
  );

  const setForwardTrigger = useCallback(
    () =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "SET_FORWARD_TRIGGER",
        }),
      ),
    [dispatch],
  );

  const setOriginTrackList = useCallback(
    (originTrackId: string, originTrackList: Array<Track>) =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "SET_ORIGIN_TRACK_LIST",
          originTrackId,
          originTrackList,
        }),
      ),
    [dispatch],
  );

  const setPlayList = useCallback(
    (playList: Array<Track>) =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "SET_PLAY_LIST",
          playList,
        }),
      ),
    [dispatch],
  );

  const addTrack = useCallback(
    (track: Track) =>
      dispatch(
        playerControlActions.playerControlReducer({ type: "ADD_TRACK", track }),
      ),
    [dispatch],
  );

  const deleteTrack = useCallback(
    (track: Track) =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "DELETE_TRACK",
          track,
        }),
      ),
    [dispatch],
  );

  const setPlayListType = useCallback(
    (playListType: PLAY_LIST_TYPE) =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "SET_PLAY_LIST_TYPE",
          playListType,
        }),
      ),
    [dispatch],
  );

  const setCurrentTrack = useCallback(
    (currentTrack: Track) =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "SET_CURRENT_TRACK",
          currentTrack,
        }),
      ),
    [dispatch],
  );

  const setTotalTime = useCallback(
    (totalTime: number) =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "SET_TOTAL_TIME",
          totalTime,
        }),
      ),
    [dispatch],
  );

  const doShuffle = useCallback(
    (list: Array<Track>) => {
      if (shuffle) {
        const currentIndex = list.findIndex(
          track => track.trackTitle === currentTrack.trackTitle,
        );

        const prevList = [...list];

        if (currentIndex !== -1) prevList.splice(currentIndex, 1);

        // Fisher-Yates Shuffle
        for (let i = prevList.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [prevList[i], prevList[j]] = [prevList[j], prevList[i]];
        }

        const shuffledList =
          currentIndex !== -1 ? [currentTrack, ...prevList] : [...prevList];

        setPlayList(shuffledList);
        setCurrentTrack(currentIndex === -1 ? shuffledList[0] : currentTrack);
      } else {
        setPlayList(originTrackList);
        setCurrentTrack(
          currentTrack === null ? originTrackList[0] : currentTrack,
        );
      }
    },
    [shuffle, currentTrack],
  );

  const handlePlayListClick = (
    playListType: PLAY_LIST_TYPE,
    album: AlbumInfo,
  ) => {
    setPlayListType(playListType);

    const TrackList = album.tracks;

    const currentIndex = currentTrack
      ? TrackList.findIndex(
          (track: any) => track.trackTitle === currentTrack.trackTitle,
        )
      : -1;

    if (currentIndex === -1) setPlay(false);
    setOriginTrackList(album.id, TrackList);
    setCurrentTrack(currentIndex === -1 ? TrackList[0] : currentTrack);

    if (shuffle) {
      doShuffle(TrackList);
    } else {
      setPlayList(TrackList);
    }

    //  if (!play) {
    //   setTimeout(() => setPlay(true), 800);
    // }
  };

  const context = {
    play,
    shuffle,
    repeatMode,
    forwardMode,
    forwardTrigger,
    originTrackId,
    originTrackList,
    playList,
    playListType,
    currentTrack,
    totalTime,
    setPlay: (play: boolean) => setPlay(play),
    setShuffle: (shuffle: boolean) => setShuffle(shuffle),
    setRepeatMode: (repeatMode: PLAYER_REPEAT_MODE) =>
      setRepeatMode(repeatMode),
    setForwardTrigger: () => setForwardTrigger(),
    setOriginTrackList: (
      originTrackId: string,
      originTrackList: Array<Track>,
    ) => setOriginTrackList(originTrackId, originTrackList),
    setPlayList: (playList: Array<Track>) => setPlayList(playList),
    addTrack: (track: Track) => addTrack(track),
    deleteTrack: (track: Track) => deleteTrack(track),
    setPlayListType: (playListType: PLAY_LIST_TYPE) =>
      setPlayListType(playListType),
    setCurrentTrack: (currentTrack: Track) => setCurrentTrack(currentTrack),
    setTotalTime: (totalTime: number) => setTotalTime(totalTime),
    doShuffle: (list: Array<Track>) => doShuffle(list),
    handlePlayListClick: (playListType: PLAY_LIST_TYPE, album: AlbumInfo) =>
      handlePlayListClick(playListType, album),
  };

  return context;
};
