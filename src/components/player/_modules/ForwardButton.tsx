import React from "react";
import _ from "lodash";

import { cn } from "@/lib/utils";

import usePlayTimeStore from "@/stores/usePlayTimeStore";
import { usePlayerControl } from "@/stores/usePlayerControl";

import Button from "@/components/buttons/Button";
import { Forward } from "@/components/icons";

const ForwardButton = ({
  isForward,
  className,
}: {
  isForward: boolean;
  className?: string;
}) => {
  const currentTrack = usePlayerControl(state => state.currentTrack);
  const playList = usePlayerControl(state => state.playList);
  const setCurrentTrack = usePlayerControl(state => state.setCurrentTrack);
  const setForwardTrigger = usePlayerControl(state => state.setForwardTrigger);

  const getPlayTime = usePlayTimeStore(state => state.getPlayTime);
  const setPlayTime = usePlayTimeStore(state => state.setPlayTime);

  const handleForwardButton = React.useCallback(
    (isForword: boolean) => {
      const currentIdx = playList.findIndex(
        el => el.trackTitle === currentTrack.trackTitle,
      );

      let nextIdx = currentIdx;

      if (isForword) {
        nextIdx = (currentIdx + 1) % playList.length;
        // setForwardMode("FORWARD"); // 0 ~ 1 해벌면... N % 1
      } else if (getPlayTime() < 10) {
        // 재생시간이 10초 미만이면 이전 트랙
        // 그렇지 않다면 현재트랙
        if (currentIdx === 0) nextIdx = playList.length - 1;
        else nextIdx = (currentIdx - 1) % playList.length;
        // setForwardMode("BACKWARD");
      } else {
        // setForwardMode("RESTART");
      }

      setForwardTrigger();
      setPlayTime(0);
      setCurrentTrack(playList[nextIdx]);
    },
    [
      currentTrack,
      playList,
      setForwardTrigger,
      getPlayTime,
      setPlayTime,
      setCurrentTrack,
    ],
  );

  // 개선 필요
  const debouncedHandleForwardButton = React.useMemo(
    () =>
      _.debounce((isForward: boolean) => {
        handleForwardButton(isForward);
      }, 100),
    [handleForwardButton],
  );

  return (
    <Button
      variant="plain"
      useRipple
      className={cn(
        "w-14 h-14 rounded-full flex justify-center items-center",
        className,
      )}
      onClick={() => debouncedHandleForwardButton(isForward)}
    >
      {isForward ? (
        <Forward width="64" height="64" />
      ) : (
        <Forward width="64" height="64" className="rotate-180" />
      )}
    </Button>
  );
};

export default ForwardButton;
