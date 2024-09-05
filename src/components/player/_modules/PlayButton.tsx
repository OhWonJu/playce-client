import React from "react";

import { cn } from "@/lib/utils";

import { usePlayerControl } from "@/hooks/usePlayerControl";

import Button from "@/components/Button/Button";
import { Pause, Play } from "@/components/icons";

const PlayButton = ({ className }: { className?: string }) => {
  const { setPlay, play } = usePlayerControl();

  return (
    <Button
      variant="plain"
      useRipple
      className={cn(
        "w-16 h-16 rounded-full flex justify-center items-center",
        className,
      )}
      onClick={() => setPlay(!play)}
    >
      {play === true ? (
        <Pause width="30" height="30" className="fill-primary" />
      ) : (
        <Play width="30" height="30" className="fill-primary" />
      )}
    </Button>
  );
};

export default PlayButton;
