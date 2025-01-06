import { Suspense, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import styled, { css } from "styled-components";
import tw from "twin.macro";

import {
  DESKTOP_PLAYER_WIDTH,
  NAV_HEIGHT,
  PLAYER_HEADER_HEIGHT,
} from "./constants/uiSizes";

import useViewModeStore from "./stores/useViewMode";
import { usePlayerToggle } from "./stores/usePlayerToggleStore";

import Navigator from "./components/Navigator/Navigator";
import AuthProvider from "./components/providers/AuthProvider";
import ModalProvider from "./components/providers/ModalProvider";
import SidebarProvider from "./components/providers/SidebarProvider";
import { HelmetHeader } from "./components";

import ErrorFallback from "./errors/ErrorFallback";

const NON_PLAYABLE_PATHS = ["/", "/join"]; // same condition for navigator

const RootLayout = () => {
  const location = useLocation();
  const { viewMode } = useViewModeStore();
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
      <HelmetHeader />
      <ErrorBoundary
        fallbackRender={fallbackProps => <ErrorFallback {...fallbackProps} />}
        resetKeys={[location.pathname]}
      >
        <ModalProvider />
        <SidebarProvider />
        <AuthProvider>
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
                  <Suspense>
                    <Outlet />
                  </Suspense>
                </PlayableLayout>
              ) : (
                <NonPlayableLayout
                  id="root-layout"
                  $isDesktop={viewMode === "DESKTOP" ? true : false}
                >
                  <Suspense>
                    <Outlet />
                  </Suspense>
                </NonPlayableLayout>
              )}
            </>
          )}
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
};

export default RootLayout;

const PlayableLayout = styled.div<{ $isDesktop: boolean }>`
  position: relative;
  width: 100vw;
  max-width: 100vw;
  height: 100dvh;
  max-height: 100dvh;
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

  ${tw`transition overflow-y-scroll scrollbar-hide`};
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
  width: 100%;

  /* ${tw`lg:max-w-[800px] xl:max-w-[1000px] 2xl:max-w-[1200px]`} */
  ${tw`px-4 md:px-5 items-center transition overflow-y-scroll scrollbar-hide`}
`;
