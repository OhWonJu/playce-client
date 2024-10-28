import styled from "styled-components";
import tw from "twin.macro";
import { motion } from "framer-motion";

import { NAV_HEIGHT, PLAYER_HEADER_HEIGHT } from "@/constants/uiSizes";

export const PlayerHeader = styled(motion.div)`
  ${tw`relative w-full h-full flex justify-end items-center`}
`;

export const PlayerBody = styled(motion.div)`
  ${tw`w-full h-full flex flex-col items-center`}
`;

export const AlbumArea = styled.div`
  height: 32%;

  @media screen and (min-height: 550px) {
    height: 42%;
  }

  @media screen and (min-height: 750px) {
    height: 52%;
  }

  ${tw`flex w-full overflow-hidden`}
`;

export const Album = styled(motion.div)<any>`
  max-height: 100%;
  ${tw`max-w-full mx-auto`}
`;

export const PlayerMicroCtlr = styled(motion.div)`
  height: ${PLAYER_HEADER_HEIGHT}px;
  ${tw`flex items-center justify-between`}
`;

export const PlayerCtlrArea = styled(motion.div)`
  max-height: 100%;
  ${tw`relative flex flex-col w-full items-center px-6`}
`;

export const PlayerFooter = styled(motion.div)`
  height: 20%;
  max-height: ${NAV_HEIGHT + PLAYER_HEADER_HEIGHT}px;
`;
