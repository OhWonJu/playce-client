import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Track } from "@/types";

import { RootState } from "@/stores/reduxStore";
import { playlistActions } from "@/stores/reducers";
import { PLAY_LIST_TYPE } from "@/stores/reduxTypes/playerControlType";

export const usePlaylist = () => {
  const dispatch = useDispatch();

  const {
    originTrackId,
    originTrackList,
    playList,
    playListType,
    currentTrack,
  } = useSelector(({ playlist }: RootState) => playlist);

  const setOriginTrackList = useCallback(
    (originTrackId: string, originTrackList: Array<Track>) =>
      dispatch(
        playlistActions.playlistReducer({
          type: "SET_ORIGIN_TRACK_LIST",
          originTrackId,
          originTrackList,
        }),
      ),
    [dispatch],
  );

  const setPlayList = useCallback(
    (playList: Track[]) =>
      dispatch(
        playlistActions.playlistReducer({
          type: "SET_PLAY_LIST",
          playList,
        }),
      ),
    [dispatch],
  );

  const addTrack = useCallback(
    (track: Track) =>
      dispatch(playlistActions.playlistReducer({ type: "ADD_TRACK", track })),
    [dispatch],
  );

  const deleteTrack = useCallback(
    (track: Track) =>
      dispatch(
        playlistActions.playlistReducer({
          type: "DELETE_TRACK",
          track,
        }),
      ),
    [dispatch],
  );

  const setPlayListType = useCallback(
    (playListType: PLAY_LIST_TYPE) =>
      dispatch(
        playlistActions.playlistReducer({
          type: "SET_PLAY_LIST_TYPE",
          playListType,
        }),
      ),
    [dispatch],
  );

  const setCurrentTrack = useCallback(
    (currentTrack: Track) =>
      dispatch(
        playlistActions.playlistReducer({
          type: "SET_CURRENT_TRACK",
          currentTrack,
        }),
      ),
    [dispatch],
  );

  const context = {
    originTrackId,
    originTrackList,
    playList,
    playListType,
    currentTrack,
    setOriginTrackList: (originTrackId: string, originTrackList: Track[]) =>
      setOriginTrackList(originTrackId, originTrackList),
    setPlayList: (playList: Track[]) => setPlayList(playList),
    addTrack: (track: Track) => addTrack(track),
    deleteTrack: (track: Track) => deleteTrack(track),
    setPlayListType: (playListType: PLAY_LIST_TYPE) =>
      setPlayListType(playListType),
    setCurrentTrack: (currentTrack: Track) => setCurrentTrack(currentTrack),
  };

  return context;
};
