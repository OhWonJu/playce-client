import React, { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { usePlayerControl } from "@/stores/usePlayerControl";

import Button from "@/components/buttons/Button";
import { Shuffle } from "@/components/icons";

const ShuffleButton = () => {
  // 리랜더링시 셔플이 다시되는 현상 발생
  const { shuffle, setShuffle, doShuffle, originTrackList } =
    usePlayerControl();

  const prevSuffleState = useRef(shuffle);

  useEffect(() => {
    if (prevSuffleState.current && shuffle) return;
    prevSuffleState.current = shuffle;
    doShuffle(originTrackList);
  }, [shuffle]);

  return (
    <Button
      variant="plain"
      useRipple
      className="p-2 rounded-full"
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
