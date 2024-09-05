import Button from "@/components/Button/Button";
import { Shuffle } from "@/components/icons";
import { usePlayerControl } from "@/hooks/usePlayerControl";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

const ShuffleButton = () => {
  const { shuffle, setShuffle, doShuffle, originTrackList } =
    usePlayerControl();

  useEffect(() => {
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
