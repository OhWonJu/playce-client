import { lazy } from "react";
import { RouteProps } from "react-router";

import RootPage from "./pages/(root)/Page";
import HomePage from "./pages/(home)/(routes)/home/Page";
import OAuthCallbackPage from "./pages/(auth)/(routes)/callback/page";

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
const CabinetPlayListIdPage = lazy(
  () => import("./pages/(cabinet)/(routes)/playlists/[playlistId]/page"),
);

const CabinetQueuePage = lazy(
  () => import("./pages/(cabinet)/(routes)/queue/Page"),
);

const KakaoPaymentSuccessPage = lazy(
  () => import("./pages/(payment)/(routes)/kakako/success/page"),
);
const KakaoPaymentCancelPage = lazy(
  () => import("./pages/(payment)/(routes)/kakako/cancel/page"),
);
const KakaoPaymentFailPage = lazy(
  () => import("./pages/(payment)/(routes)/kakako/fail/page"),
);

const AccessDenied = lazy(() => import("./pages/AccessDenied"));
const NotFound = lazy(() => import("./pages/NotFound"));

type CustomRouteProps = RouteProps & {
  path: string;
  element: React.ReactElement;
};

export const privateRoutes: CustomRouteProps[] = [
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
    path: "/cabinet/playlists/:playlistName",
    element: <CabinetPlayListIdPage />,
  },
  {
    path: "/cabinet/queue",
    element: <CabinetQueuePage />,
  },
];

export const alternativeRoutes: CustomRouteProps[] = [
  {
    path: "/",
    element: <RootPage />,
  },
  {
    path: "/join",
    element: <JoinPage />,
  },
  {
    path: "/oauth/callback",
    element: <OAuthCallbackPage />,
  },
];

export const publicRoutes: CustomRouteProps[] = [
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/explore",
    element: <ExplorePage />,
  },
  {
    path: "/albums/:albumName",
    element: <AlbumIdPage />,
  },
  {
    path: "/profile/:userId",
    element: <UserIdPage />,
  },
  {
    path: "/payment/kakao/success",
    element: <KakaoPaymentSuccessPage />,
  },
  {
    path: "/payment/kakao/cancel",
    element: <KakaoPaymentCancelPage />,
  },
  {
    path: "/payment/kakao/fail",
    element: <KakaoPaymentFailPage />,
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
