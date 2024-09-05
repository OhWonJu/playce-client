import React, { useCallback } from "react";

import usePlayTimeStore from "@/stores/usePlayTimeStore";

import {
  PlayIndicatorBackGround,
  PlayIndicatorBar,
} from "./playIndicator.styles";

const PlayIndicator = () => {
  const { playTime, totalTime } = usePlayTimeStore();

  const getPercent = useCallback(
    (playTime: number, totalTime: number): number => {
      return Math.floor((playTime / totalTime) * 100);
    },
    [],
  );

  return (
    <PlayIndicatorBackGround>
      <PlayIndicatorBar $percent={getPercent(playTime, totalTime)} />
    </PlayIndicatorBackGround>
  );
};

export default PlayIndicator;
