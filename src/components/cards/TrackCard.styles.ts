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
  overflow: "hidden";
  will-change: "transform";
  cursor: pointer;
`;

export const TrackMotion = styled(motion.div)<{ $focused: boolean }>`
  display: flex;
  width: 100%;
  min-width: 100%;
  height: 100%;
  align-items: center;
  background-color: ${props =>
    props.$focused
      ? props.theme.gray_extra_light
      : props.theme.background_color};

  ${tw`p-1 rounded-md z-20`}
`;

export const TrackDeleteButton = styled(motion.div)`
  background-color: ${props => props.theme.red_primary};
  a {
    color: ${props => props.theme.text_secondary_color};
    ${tw`font-semibold`}
  }

  ${tw`absolute grid place-content-center right-0 w-[90px] h-full rounded-md z-10`}
`;

export const ArtWrapper = styled.section`
  position: relative;
  min-height: ${TRACK_CARD_HEIGHT - 8}px;
  min-width: ${TRACK_CARD_HEIGHT - 8}px;
  overflow: hidden;

  ${tw`rounded-full mr-2`}
`;
