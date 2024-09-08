import { lazy } from "react";
import { RouteProps } from "react-router";

import RootPage from "./pages/(root)/Page";
import HomePage from "./pages/(home)/(routes)/home/Page";
import UserIdPage from "./pages/(profile)/(routes)/[userId]/Page";
import AlbumIdPage from "./pages/(albums)/(routes)/[albumId]/Page";
import JoinPage from "./pages/(auth)/(routes)/join/Page";
import ExplorePage from "./pages/(explore)/(routes)/explore/Page";
import CabinetPage from "./pages/(cabinet)/(routes)/page";
import CabinetAlbumsPage from "./pages/(cabinet)/(routes)/albums/Page";
import CabinetPlayListsPage from "./pages/(cabinet)/(routes)/playlists/Page";
import CabinetQueuePage from "./pages/(cabinet)/(routes)/queue/Page";

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
