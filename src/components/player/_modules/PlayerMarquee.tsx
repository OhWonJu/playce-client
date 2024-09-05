import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";

interface PlayerMarqueeProps {
  title: string;
}

const PlayerMarquee: React.FC<PlayerMarqueeProps> = ({ title }) => {
  const containerRef: MutableRefObject<HTMLDivElement> = useRef();
  const titleRef: MutableRefObject<HTMLDivElement> = useRef();

  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    if (titleRef.current?.clientWidth > containerRef.current?.clientWidth)
      setScrollable(true);
    else setScrollable(false);
  }, [title, containerRef.current?.clientWidth, titleRef]);

  const marqueeVariants = useMemo(() => {
    if (titleRef.current) {
      return {
        animate: {
          x: [0, -titleRef.current?.clientWidth - 60],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              delay: 3,
              repeatDelay: 2,
              duration: 8,
              ease: "linear",
            },
          },
        },
      };
    } else return null;
  }, [titleRef.current?.clientWidth]);

  // useEffect(() => {
  //   if (titleRef.current) {
  //     set({
  //       animate: {
  //         x: [0, -titleRef.current?.clientWidth - 60],
  //         transition: {
  //           x: {
  //             repeat: Infinity,
  //             repeatType: "loop",
  //             delay: 3,
  //             repeatDelay: 2,
  //             duration: 8,
  //             ease: "easeIn",
  //           },
  //         },
  //       },
  //     });
  //   }
  // }, [titleRef.current?.clientWidth]);

  return (
    <>
      <div
        ref={containerRef}
        className="marquee relative  w-full h-[48px] overflow-hidden"
      >
        {scrollable ? (
          <motion.div
            className="track absolute whitespace-nowrap will-change-transform h-full"
            variants={marqueeVariants}
            animate="animate"
          >
            <div className="flex items-center h-full">
              <h1 className="font-extrabold text-3xl pr-[60px]">{title}</h1>
              <h1 ref={titleRef} className="font-extrabold text-3xl">
                {title}
              </h1>
            </div>
          </motion.div>
        ) : (
          <div className="flex justify-center items-center h-full whitespace-nowrap">
            <h1 ref={titleRef} className="font-extrabold text-3xl">
              {title}
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default PlayerMarquee;
