import React from "react";

import { convertTime } from "@/lib/utils";

import usePlayTimeStore from "@/stores/usePlayTimeStore";

const PlayTimer = () => {
  const playTime = usePlayTimeStore(state => state.playTime);
  const totalTime = usePlayTimeStore(state => state.totalTime);

  return (
    <>
      <>
        <p>{convertTime(playTime, "string")}</p>
        {totalTime && (
          <p>{totalTime === 0 ? "0:00" : convertTime(totalTime, "string")}</p>
        )}
      </>
    </>
  );
};

export default PlayTimer;
