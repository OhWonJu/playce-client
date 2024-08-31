import { lazy } from "react";
import { RouteProps } from "react-router";

import RootPage from "./pages/(root)/Page";
import HomePage from "./pages/(home)/(routes)/home/Page";
import UserIdPage from "./pages/(profile)/(routes)/[userId]/Page";
import AlbumIdPage from "./pages/(albums)/(routes)/[albumId]/Page";
import MyAlbumsPage from "./pages/(my)/(routes)/albums/Page";
import MyPlayListsPage from "./pages/(my)/(routes)/playlists/Page";
import MyQueuePage from "./pages/(my)/(routes)/queue/Page";
import LoginPage from "./pages/(auth)/(routes)/login/Page";
import SignUpPage from "./pages/(auth)/(routes)/signUp/Page";

const AccessDenied = lazy(() => import("./pages/AccessDenied"));
const NotFound = lazy(() => import("./pages/NotFound"));
const KakaoCallBackPage = lazy(
  () => import("./pages/(auth)/(routes)/kakao/Page"),
);

type CustomRouteProps = RouteProps & {
  path: string;
  element: React.ReactElement;
};

export const privateRoutes: CustomRouteProps[] = [
  {
    path: "/profile/:userId",
    element: <UserIdPage />,
  },
  {
    path: "/albums/:albumId",
    element: <AlbumIdPage />,
  },
  {
    path: "/my/albums",
    element: <MyAlbumsPage />,
  },
  {
    path: "/my/playlists",
    element: <MyPlayListsPage />,
  },
  {
    path: "/my/queue",
    element: <MyQueuePage />,
  },
];

export const publicRoutes: CustomRouteProps[] = [
  {
    path: "/",
    element: <RootPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/kakao",
    element: <KakaoCallBackPage />,
  },
  {
    path: "/access-denied",
    element: <AccessDenied />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
