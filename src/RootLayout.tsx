import { PropsWithChildren, useMemo } from "react";

import ModalProvider from "./components/providers/ModalProvider";
import ViewModeProvider from "./components/providers/ViewModeProvider";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import {
  DESKTOP_PLAYER_WIDTH,
  NAV_HEIGHT,
  PLAYER_HEADER_HEIGHT,
} from "./constants/uiSizes";
import { useLocation } from "react-router";
import useViewModeStore from "./stores/useViewMode";
import { usePlayerToggle } from "./stores/usePlayerToggleStore";
import Navigator from "./components/Navigator/Navigator";
import { Player } from "./components";
import { PlayerBottomSheet } from "./components/playerBottomSheet";

const NON_PLAYABLE_PATHS = ["/", "/join"];

const RootLayout = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const { viewMode } = useViewModeStore();
  const { displayPlayer } = usePlayerToggle();
  const closePlayer = usePlayerToggle(state => state.onClose);

  const isPlayablePaths = useMemo(() => {
    const isAble = NON_PLAYABLE_PATHS.includes(location.pathname)
      ? false
      : true;

    if (!isAble) closePlayer();

    return isAble;
  }, [location.pathname]);

  return (
    <>
      <ViewModeProvider />
      {displayPlayer && <Player />}
      <ModalProvider />
      {viewMode !== "INIT" && (
        <>
          {isPlayablePaths && (
            <Navigator pathName={location.pathname.split("/")[1]} />
          )}
          {isPlayablePaths ? (
            <PlayableContainer
              id="root-layout"
              $isDesktop={viewMode === "DESKTOP" ? true : false}
            >
              {children}
            </PlayableContainer>
          ) : (
            <NonPlayableContainer
              id="root-layout"
              $isDesktop={viewMode === "DESKTOP" ? true : false}
            >
              {children}
            </NonPlayableContainer>
          )}
        </>
      )}
      {displayPlayer && viewMode !== "DESKTOP" && <PlayerBottomSheet />}
    </>
  );
};

export default RootLayout;

const PlayableContainer = styled.div<{ $isDesktop: boolean }>`
  position: relative;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: ${props => (props.$isDesktop ? NAV_HEIGHT * 2 : NAV_HEIGHT)}px;
  ${props =>
    props.$isDesktop
      ? `padding-bottom: ${NAV_HEIGHT}px`
      : `padding-bottom: ${NAV_HEIGHT + PLAYER_HEADER_HEIGHT}px;`};

  ${props =>
    props.$isDesktop && `padding-left: ${DESKTOP_PLAYER_WIDTH + 16}px;`}
  ${props =>
    props.$isDesktop && `padding-right: ${DESKTOP_PLAYER_WIDTH + 16}px;`}
  

  ${props => {
    if (!props.$isDesktop) {
      return css`
        ${tw`px-4 md:px-6`}
      `;
    }
  }}

  ${tw`transition`}
`;

const NonPlayableContainer = styled.div<{ $isDesktop: boolean }>`
  position: relative;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: ${props => (props.$isDesktop ? NAV_HEIGHT * 2 : NAV_HEIGHT)}px;
  padding-bottom: ${NAV_HEIGHT}px;

  ${tw`lg:max-w-[800px] xl:max-w-[1000px] 2xl:max-w-[1200px]`}
  ${tw`pl-4 pr-4 md:pl-5 md:pr-5 mx-auto transition`}
`;
