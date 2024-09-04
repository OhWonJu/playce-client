import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/stores/reduxStore";

import { playTimeActions } from "@/stores/reducers";

export const usePlayTimeControl = () => {
  const dispatch = useDispatch();

  const { playTime } = useSelector(
    ({ playTimeControl }: RootState) => playTimeControl,
  );

  const setPlayTime = useCallback(
    (playTime: number) =>
      dispatch(
        playTimeActions.playTimeReducer({
          type: "SET_PLAY_TIME",
          playTime,
        }),
      ),
    [dispatch],
  );

  const context = {
    playTime,
    setPlayTime: (playTime: number) => setPlayTime(playTime),
  };

  return context;
};

export const useSetPlayTime = () => {
  const dispatch = useDispatch();

  const setPlayTime = useCallback(
    (playTime: number) =>
      dispatch(
        playTimeActions.playTimeReducer({
          type: "SET_PLAY_TIME",
          playTime,
        }),
      ),
    [dispatch],
  );

  const context = {
    setPlayTime: (playTime: number) => setPlayTime(playTime),
  };

  return context;
};
