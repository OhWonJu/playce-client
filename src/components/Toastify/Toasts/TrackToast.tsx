import { Track } from "@/types";
import React from "react";
import { toast } from "react-toastify";

interface QueueToastProps {
  targetName: string;
  track: Track;
  isAdd: boolean;
}

const QueueToast = ({ targetName, track, isAdd }: QueueToastProps) => {
  return (
    <div className="flex flex-col w-full h-full">
      <section>
        <span className="font-extrabold text-xs text-primary">
          {isAdd ? `${targetName}에 추가됨` : `${targetName}에서 제거됨`}
        </span>
      </section>
      <section>
        <span className="font-semibold text-sm text-primary line-clamp-1 truncate">{`${track.artistName} - ${track.trackTitle}`}</span>
      </section>
    </div>
  );
};

const Toast = ({ targetName, track, isAdd }: QueueToastProps) =>
  toast(<QueueToast targetName={targetName} track={track} isAdd={isAdd} />);

export default Toast;
