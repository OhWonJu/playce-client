import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";

import { NAV_HEIGHT } from "@/constants/uiSizes";

export const MobileNavigatorWrapper = styled(motion.nav)`
  position: fixed;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100vw;
  height: ${NAV_HEIGHT}px;
  z-index: var(--navigator);
  background-color: var(--background);
`;

export const NavButtonArea = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 100%;

  ${tw`px-4 py-2`}
`;
