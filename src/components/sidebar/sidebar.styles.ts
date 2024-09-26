import styled from "styled-components";
import tw from "twin.macro";

import { NAV_HEIGHT } from "@/constants/uiSizes";
import { VIEW_MODES } from "@/stores/useViewMode";

export const SidebarContainer = styled.aside<{
  $align: "left" | "right";
  $viewMode: VIEW_MODES;
}>`
  position: fixed;
  display: flex;
  top: 0px;
  flex-direction: column;
  height: 100%;
  padding-bottom: ${props =>
    props.$viewMode === "DESKTOP" ? "0" : `${NAV_HEIGHT}px`};
  background-color: var(--background);
  z-index: ${props =>
    props.$viewMode === "DESKTOP"
      ? "calc(var(--sidebar) + 50)"
      : "var(--sidebar)"};
  overflow: hidden;

  ${tw`shadow-lg dark:border-l dark:border-r border-neutral-100 dark:border-neutral-700`};
`;

export const SidebarHeader = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;

  padding: 1rem;
`;

export const SidebarContent = styled.section`
  position: relative;
  display: flex;
  flex: 1;

  padding: 1rem;

  overflow-y: scroll;

  ${tw`scrollbar-hide`}
`;

export const SidebarFooter = styled.section`
  display: flex;

  padding: 1rem;
`;
