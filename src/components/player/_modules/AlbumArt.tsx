import React, { useEffect, useRef, useState } from "react";
import { motion, MotionValue } from "framer-motion";

import { usePlayerControl } from "@/stores/usePlayerControl";

import Image from "@/components/Image";

interface AlbumArtProps {
  artURL?: string;
  pinOpacity: MotionValue<number>;
}

const AlbumArt = ({ artURL, pinOpacity }: AlbumArtProps) => {
  const isPlay = usePlayerControl(state => state.play);
  const originTrackId = usePlayerControl(state => state.originTrackId);

  const [playing, setPlaying] = useState(undefined);
  const angleRef = useRef(0);

  useEffect(() => {
    if (!isPlay && typeof playing === "undefined") return;
    if (isPlay === playing) return;

    setPlaying(isPlay);
  }, [isPlay]);

  useEffect(() => {
    angleRef.current = 0;
  }, [originTrackId]);

  if (artURL) {
    return (
      <div
        className="relative w-full h-full p-[0.2rem]"
        style={{ contain: "content", willChange: "transform" }}
      >
        <div className="relative w-full aspect-square rounded-full overflow-hidden flex items-center justify-center shadow-album">
          <motion.div
            className="relative w-full aspect-square rounded-full overflow-hidden"
            animate={
              typeof playing === "undefined"
                ? { rotate: 0 }
                : playing
                ? { rotate: 360 + angleRef.current }
                : { rotate: angleRef.current + 45 }
            }
            initial={{ rotateX: angleRef.current }}
            transition={{
              repeat: playing ? Infinity : 0, // 재생 중일 때만 무한 회전
              duration: playing ? 8 : 2,
              ease: playing ? "linear" : "easeOut",
              onUpdate: (latest: number) => {
                angleRef.current = latest;
              },
            }}
          >
            <Image
              imageUrl={artURL}
              alt="album image"
              draggable={false}
              className="object-cover"
            />
          </motion.div>
          <motion.div
            className="_PIN_WRAPPER_ absolute w-[15%] flex items-center justify-center"
            style={{ opacity: pinOpacity }}
          >
            <Pin />
          </motion.div>
        </div>
      </div>
    );
  } else null;
};

export default AlbumArt;

const Pin = () => {
  return (
    <>
      <div className="grid place-items-center w-full aspect-square rounded-full bg-[#FBFBF9] bg-opacity-50 z-10">
        <div className="grid place-items-center w-[85%] aspect-square rounded-full bg-white dark:bg-neutral-700">
          <div className="relative grid place-items-center w-[85%] aspect-square rounded-full shadow-inner border-[1px] border-neutral-100 dark:border-neutral-600 bg-background" />
          {/* <div className="relative w-[85%] aspect-square bg-zinc-700 rounded-full shadow-inner">
            <div className="absolute grid place-items-center inset-x-0 w-full h-full">
              <div className="absolute w-[10%] h-[35%] bg-zinc-400 bottom-0" />
            </div>
            <div className="absolute grid place-items-center inset-x-0 w-full h-full rotate-[120deg]">
              <div className="absolute w-[10%] h-[35%] bg-zinc-400 bottom-0" />
            </div>
            <div className="absolute grid place-items-center inset-x-0 w-full h-full rotate-[240deg]">
              <div className="absolute w-[10%] h-[35%] bg-zinc-400 bottom-0" />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
