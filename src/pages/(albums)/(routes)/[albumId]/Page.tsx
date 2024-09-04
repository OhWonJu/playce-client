import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getAlbumInfo } from "@/api/album";
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

  const totalTimes = useMemo(
    () => data?.album.tracks?.reduce((acc, cur) => acc + cur.trackTime, 0),
    [data],
  );

  if (isLoading) return null;

  if (!data) return null;

  const { album, own } = data;

  return (
    <div className="flex flex-col">
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
          <AlbumActions isOwn={own} />
        </AlbumUtilsWrapper>
      </AlbumInfoWrapper>

      {/* TRACK LIST */}
      <AlbumTrackList tracks={album.tracks} isOwn={own} />

      {/* <ul className="flex flex-col w-full space-y-2">
        {album?.tracks?.map((track, index) => (
          <TrackLi
            key={index}
            index={index}
            data={track}
            isOwn={isOwn}
            trackListType="ALBUM"
          />
        ))}
      </ul> */}
    </div>
  );
};

export default AlbumIdPage;
