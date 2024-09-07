import React from "react";

import { cn } from "@/lib/utils";
import { usePlayerControl } from "@/stores/usePlayerControl";

import Button from "@/components/Button/Button";
import { Pause, Play } from "@/components/icons";

const PlayButton = ({ className }: { className?: string }) => {
  const play = usePlayerControl(state => state.play);
  const setPlay = usePlayerControl(state => state.setPlay);

  return (
    <Button
      variant="plain"
      useRipple
      className={cn(
        "w-[4rem] h-[4rem] rounded-full flex justify-center items-center",
        className,
      )}
      onClick={() => setPlay(!play)}
    >
      {play === true ? (
        <Pause width="64" height="64" className="fill-primary" />
      ) : (
        <Play width="64" height="64" className="fill-primary" />
      )}
    </Button>
  );
};

export default PlayButton;
