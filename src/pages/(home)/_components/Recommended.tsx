import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import { UseQueryResult } from "@tanstack/react-query";

import { AlbumInfo } from "@/types";

import { MusicCard, MusicList } from "@/components";

const Recommended = ({
  recommededAlbumsQuery,
}: {
  recommededAlbumsQuery: UseQueryResult<AlbumInfo[]>;
}) => {
  const navigate = useNavigate();

  const recommendedAlbums = use(recommededAlbumsQuery.promise) as AlbumInfo[];

  const recommendedAlbumsRenderer = () => {
    return recommendedAlbums.map(album => (
      <MusicCard
        key={`recommend-${album.id}`}
        title={album.albumName}
        imageUrl={album.albumArtURL}
        subTitle={album.artist.artistName}
        onClick={() =>
          navigate(`/albums/${album.albumName}?albumId=${album.id}`)
        }
      />
    ));
  };

  return (
    <MusicList
      id="recommended"
      title="추천 앨범"
      renderer={recommendedAlbumsRenderer}
      exceptionGuide={`작업중`}
    />
  );
};

export default Recommended;
