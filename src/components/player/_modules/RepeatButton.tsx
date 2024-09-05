import React, { useCallback } from "react";

import { usePlayerControl } from "@/hooks/usePlayerControl";

import Button from "@/components/Button/Button";
import { Repeat } from "@/components/icons";

const RepeatButton = () => {
  const { repeatMode, setRepeatMode } = usePlayerControl();

  const handleClick = useCallback(() => {
    switch (repeatMode) {
      case "NONE": {
        setRepeatMode("REPEAT_ALL");
        return;
      }
      case "REPEAT": {
        setRepeatMode("NONE");
        return;
      }
      case "REPEAT_ALL": {
        setRepeatMode("REPEAT");
        return;
      }
    }
  }, [setRepeatMode]);

  return (
    <Button
      variant="plain"
      useRipple
      className="relative grid place-items-center p-2 rounded-full"
      onClick={handleClick}
    >
      {repeatMode === "NONE" ? (
        <Repeat className="fill-primary-foreground" />
      ) : repeatMode === "REPEAT_ALL" ? (
        <Repeat className="fill-primary" />
      ) : (
        <>
          <Repeat className="fill-primary" />
          <span
            className="absolute inset-0 grid place-items-center w-full h-full font-extrabold"
            style={{
              paddingTop: 2,
              fontSize: 9,
            }}
          >
            1
          </span>
        </>
      )}
    </Button>
  );
};

export default RepeatButton;
