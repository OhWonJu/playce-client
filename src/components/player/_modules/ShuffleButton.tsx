import React, { useLayoutEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { usePlayerControl } from "@/stores/usePlayerControl";

import Button from "@/components/buttons/Button";
import { Shuffle } from "@/components/icons";

const ShuffleButton = () => {
  // 리랜더링시 셔플이 다시되는 현상 발생
  const shuffle = usePlayerControl(state => state.shuffle);
  const setShuffle = usePlayerControl(state => state.setShuffle);
  const doShuffle = usePlayerControl(state => state.doShuffle);
  const originTrackList = usePlayerControl(state => state.originTrackList);

  const prevSuffleState = useRef(shuffle);

  useLayoutEffect(() => {
    if (prevSuffleState.current && shuffle) return;
    prevSuffleState.current = shuffle;
    doShuffle(originTrackList);
  }, [shuffle]);

  return (
    <Button
      variant="plain"
      useRipple
      className="p-2 aspect-square rounded-full"
      onClick={() => setShuffle(!shuffle)}
    >
      <Shuffle
        width="22"
        height="22"
        className={cn(shuffle ? "fill-primary" : "fill-primary-foreground")}
      />
    </Button>
  );
};

export default ShuffleButton;
