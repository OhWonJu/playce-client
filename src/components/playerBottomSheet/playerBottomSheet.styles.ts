import styled from "styled-components";
import tw from "twin.macro";

import {
  NAV_HEIGHT,
  PLAYER_BOTTOM_SHEET_HEADER_HEIGHT,
} from "@/constants/uiSizes";

export const PBSHandleWrapper = styled.section`
  width: 100%;
  height: ${PLAYER_BOTTOM_SHEET_HEADER_HEIGHT}px;

  ${tw`relative grid place-items-center`}
`;

export const PBSHandle = styled.div`
  width: 32px;
  height: 4px;
  border-radius: 2px;

  ${tw`shadow-inner bg-neutral-200/50 dark:bg-neutral-700`}
`;

export const PBSHeaderWrapper = styled.section`
  width: 100%;
  height: ${NAV_HEIGHT}px;
  box-sizing: border-box;

  ${tw`fixed px-4`};
`;

export const PBSContentWrapper = styled.section`
  max-height: calc(100% - ${NAV_HEIGHT}px);

  ${tw`flex flex-col w-full h-[87%] pt-4 pb-4 px-4 overflow-y-scroll scrollbar-hide z-[100]`}/* ${tw`flex flex-col w-full h-[87%] pt-4 pb-4 px-4 overflow-y-scroll scrollbar-hide z-[100]`} */
`;
