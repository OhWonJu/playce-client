import styled from "styled-components";
import tw from "twin.macro";

import { NAV_HEIGHT } from "@/constants/uiSizes";

export const DesktopNavigatorWrapper = styled.nav`
  position: fixed;
  top: 0px;
  width: 100vw;
  height: ${NAV_HEIGHT}px;
  z-index: var(--navigator);

  ${tw`backdrop-blur-xl bg-secondary-foreground`}
`;

export const NavButtonArea = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 40%;
  min-width: 600px;
  height: 100%;

  ${tw`mx-auto px-4 py-2`}
`;

export const ProfileArea = styled.div`
  position: absolute;
  top: 0px;
  right: 1rem;
  height: 100%;
  display: grid;
  place-items: center;

  ${tw`px-[1rem]`}
`;
