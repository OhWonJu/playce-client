import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getAlbumInfo } from "@/api/album";

import { PlayableContainer } from "@/styles/GlobalStyles";

import { AlbumInfoWrapper, AlbumUtilsWrapper } from "./page.styles";

import {
  AlbumActions,
  AlbumArt,
  AlbumInfo,
  AlbumTrackList,
} from "../../_components";

const AlbumIdPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const albumId = searchParams.get("albumId");

  if (!albumId) {
    navigate("/not-found");
    return;
  }

  const { data, isLoading } = useQuery(getAlbumInfo(albumId));

  if (isLoading) return null;

  if (!data) {
    navigate("/not-found");
    return;
  }

  const { album, own } = data;

  return (
    <PlayableContainer>
      <AlbumInfoWrapper>
        <AlbumArt imageUrl={album.albumArtURL} />

        <AlbumUtilsWrapper>
          <AlbumInfo
            albumName={album.albumName}
            albumType={album.albumType}
            artistName={album.artist.artistName}
            releasedAt={album.releasedAt}
            genres={album.genres}
            tracks={album.tracks}
          />
          <AlbumActions album={album} isOwn={own} />
        </AlbumUtilsWrapper>
      </AlbumInfoWrapper>

      {/* TRACK LIST */}
      <AlbumTrackList tracks={album.tracks} isOwn={own} className="mt-8" />
    </PlayableContainer>
  );
};

export default AlbumIdPage;
