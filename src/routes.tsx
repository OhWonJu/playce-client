import { lazy } from "react";
import { RouteProps } from "react-router";

import RootPage from "./pages/(root)/Page";
import HomePage from "./pages/(home)/(routes)/home/Page";

const UserIdPage = lazy(
  () => import("./pages/(profile)/(routes)/[userId]/Page"),
);
const AlbumIdPage = lazy(
  () => import("./pages/(albums)/(routes)/[albumId]/Page"),
);
const JoinPage = lazy(() => import("./pages/(auth)/(routes)/join/Page"));
const ExplorePage = lazy(
  () => import("./pages/(explore)/(routes)/explore/Page"),
);
const CabinetPage = lazy(() => import("./pages/(cabinet)/(routes)/page"));
const CabinetAlbumsPage = lazy(
  () => import("./pages/(cabinet)/(routes)/albums/Page"),
);
const CabinetPlayListsPage = lazy(
  () => import("./pages/(cabinet)/(routes)/playlists/Page"),
);
const CabinetQueuePage = lazy(
  () => import("./pages/(cabinet)/(routes)/queue/Page"),
);

const AccessDenied = lazy(() => import("./pages/AccessDenied"));
const NotFound = lazy(() => import("./pages/NotFound"));

type CustomRouteProps = RouteProps & {
  path: string;
  element: React.ReactElement;
};

export const privateRoutes: CustomRouteProps[] = [
  {
    path: "/albums/:albumName",
    element: <AlbumIdPage />,
  },
  {
    path: "/cabinet",
    element: <CabinetPage />,
  },
  {
    path: "/cabinet/albums",
    element: <CabinetAlbumsPage />,
  },
  {
    path: "/cabinet/playlists",
    element: <CabinetPlayListsPage />,
  },
  {
    path: "/cabinet/queue",
    element: <CabinetQueuePage />,
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
    path: "/explore",
    element: <ExplorePage />,
  },
  {
    path: "/join",
    element: <JoinPage />,
  },
  {
    path: "/profile/:userId",
    element: <UserIdPage />,
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
