import React from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getAlbumInfo } from "@/api/album";

import { NAV_HEIGHT, PLAYER_HEADER_HEIGHT } from "@/constants/uiSizes";

import { AlbumInfoWrapper, AlbumUtilsWrapper } from "./page.styles";

import {
  AlbumActions,
  AlbumArt,
  AlbumInfo,
  AlbumTrackList,
} from "../../_components";

const AlbumIdPage = () => {
  const [searchParams] = useSearchParams();

  const albumId = searchParams.get("albumId");

  const { data, isLoading } = useQuery(getAlbumInfo(albumId));

  if (isLoading) return null;

  if (!data) return null;

  const { album, own } = data;

  return (
    <div
      className="flex flex-col max-h-full  overflow-scroll scrollbar-hide"
      style={{
        paddingTop: NAV_HEIGHT * 2,
        paddingBottom: NAV_HEIGHT * 2 + PLAYER_HEADER_HEIGHT,
      }}
    >
      <AlbumInfoWrapper>
        <AlbumArt imageUrl={album.albumArtURL} />

        <AlbumUtilsWrapper>
          <AlbumInfo
            albumName={album.albumName}
            albumType={album.albumType}
            artistName={album.artist.artistName}
            genres={album.genres}
            tracks={album.tracks}
          />
          <AlbumActions album={album} isOwn={own} />
        </AlbumUtilsWrapper>
      </AlbumInfoWrapper>

      {/* TRACK LIST */}
      <AlbumTrackList tracks={album.tracks} isOwn={own} className="mt-8" />
    </div>
  );
};

export default AlbumIdPage;
