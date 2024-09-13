import { lazy, PropsWithChildren, Suspense, useMemo } from "react";
import { useLocation } from "react-router";
import styled, { css } from "styled-components";
import tw from "twin.macro";

import {
  DESKTOP_PLAYER_WIDTH,
  NAV_HEIGHT,
  PLAYER_HEADER_HEIGHT,
} from "./constants/uiSizes";

import useViewModeStore from "./stores/useViewMode";
import { usePlayerToggle } from "./stores/usePlayerToggleStore";

import ModalProvider from "./components/providers/ModalProvider";
import ViewModeProvider from "./components/providers/ViewModeProvider";
import SidebarProvider from "./components/providers/SidebarProvider";
import Navigator from "./components/Navigator/Navigator";
import { Player } from "./components";
import { StyledToastContainer } from "./components/Toastify";

const PlayerBottomSheet = lazy(
  () => import("./components/playerBottomSheet/PlayerBottomSheet"),
);

const NON_PLAYABLE_PATHS = ["/", "/join"];

const Page = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { viewMode } = useViewModeStore();
  const closePlayer = usePlayerToggle(state => state.onClose);
  const displayPlayer = usePlayerToggle(state => state.displayPlayer);

  const isPlayablePaths = useMemo(() => {
    const isAble = NON_PLAYABLE_PATHS.includes(location.pathname)
      ? false
      : true;

    if (!isAble) closePlayer();

    return isAble;
  }, [location.pathname]);

  return (
    <>
      {viewMode !== "INIT" && (
        <>
          {isPlayablePaths && (
            <Navigator pathName={location.pathname.split("/")[1]} />
          )}
          {isPlayablePaths ? (
            <PlayableLayout
              id="root-layout"
              $isDesktop={viewMode === "DESKTOP" ? true : false}
            >
              {children}
            </PlayableLayout>
          ) : (
            <NonPlayableLayout
              id="root-layout"
              $isDesktop={viewMode === "DESKTOP" ? true : false}
            >
              {children}
            </NonPlayableLayout>
          )}
        </>
      )}
      <Suspense>
        {displayPlayer && viewMode !== "DESKTOP" && <PlayerBottomSheet />}
      </Suspense>
    </>
  );
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ViewModeProvider />
      <Player />
      <ModalProvider />
      <SidebarProvider />
      <Page children={children} />
      <StyledToastContainer />
    </>
  );
};

export default RootLayout;

const PlayableLayout = styled.div<{ $isDesktop: boolean }>`
  position: relative;
  width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;

  /* ${props =>
    !props.$isDesktop &&
    `padding-bottom: ${NAV_HEIGHT + PLAYER_HEADER_HEIGHT}px;`}; */

  ${props =>
    props.$isDesktop && `padding-left: ${DESKTOP_PLAYER_WIDTH + 16}px;`}
  ${props =>
    props.$isDesktop && `padding-right: ${DESKTOP_PLAYER_WIDTH + 16}px;`}
        
  /* padding-top: ${props => (props.$isDesktop ? 0 : NAV_HEIGHT)}px; */

  ${props => {
    if (!props.$isDesktop) {
      return css`
        ${tw`px-4 md:px-6`}
      `;
    }
  }}

  ${tw`transition`} /* ${tw`transition overflow-y-scroll`} */
`;

const NonPlayableLayout = styled.div<{ $isDesktop: boolean }>`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: ${props => (props.$isDesktop ? NAV_HEIGHT * 2 : NAV_HEIGHT)}px;
  padding-bottom: ${NAV_HEIGHT}px;

  ${tw`lg:max-w-[800px] xl:max-w-[1000px] 2xl:max-w-[1200px]`}
  ${tw`pl-4 pr-4 md:pl-5 md:pr-5 mx-auto transition`}
`;
