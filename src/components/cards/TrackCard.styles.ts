import styled from "styled-components";
import { motion } from "framer-motion";
import tw from "twin.macro";

import { TRACK_CARD_HEIGHT } from "@/constants/uiSizes";

export const TrackWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  width: 100%;
  height: ${TRACK_CARD_HEIGHT}px;
  min-height: ${TRACK_CARD_HEIGHT}px;
  align-items: center;
  overflow: hidden;
  outline: none;
  cursor: pointer;

  will-change: "transform";
`;

export const TrackMotion = styled(motion.div)<{ $focused: boolean }>`
  display: flex;
  width: 100%;
  min-width: 100%;
  height: 100%;
  align-items: center;
  background-color: ${props =>
    props.$focused ? "hsl(var(--accent))" : "var(--background)"};

  ${tw`pr-4 rounded-md z-20`}
`;

export const TrackDeleteButton = styled(motion.div)`
  ${tw`absolute grid place-content-center right-0 w-[90px] h-full rounded-md z-10 bg-red-500`}
`;

export const ArtWrapper = styled.section`
  position: relative;
  min-height: ${TRACK_CARD_HEIGHT - 8}px;
  min-width: ${TRACK_CARD_HEIGHT - 8}px;
  overflow: hidden;

  ${tw`rounded-full ml-4 mr-2`}
`;
