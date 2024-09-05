
import styled from "styled-components";
import tw from "twin.macro";

import { NAV_HEIGHT, PLAYER_BOTTOM_SHEET_HEADER_HEIGHT } from "@/constants/uiSizes";

export const PBSHandleWrapper = styled.section`
  width: 100%;
  height: ${PLAYER_BOTTOM_SHEET_HEADER_HEIGHT}px;

  ${tw`relative grid place-items-center`}
`;

export const PBSHandle = styled.div`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: ${props => props.theme.gray_light};

  ${tw`shadow-inner bg-opacity-60`}
`;

export const PBSHeaderWrapper = styled.nav`
  width: 100%;
  height: ${NAV_HEIGHT}px;
  box-sizing: border-box;

  ${tw`fixed px-4`};
`;

export const PBSContentWrapper = styled.section`
  background-color: ${props => props.theme.background_color};
  max-height: calc(100% - ${NAV_HEIGHT}px);

  ${tw`flex flex-col w-full h-[87%] pt-4 pb-4 px-4 overflow-y-scroll scrollbar-hide z-[100]`}/* ${tw`flex flex-col w-full h-[87%] pt-4 pb-4 px-4 overflow-y-scroll scrollbar-hide z-[100]`} */
`;
