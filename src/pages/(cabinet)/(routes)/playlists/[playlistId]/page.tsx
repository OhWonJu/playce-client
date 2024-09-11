import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getPlaylist } from "@/api/playlist";

import {
  AlbumInfoWrapper,
  AlbumUtilsWrapper,
} from "@/pages/(albums)/(routes)/[albumId]/page.styles";
import { AlbumArt, AlbumInfo } from "@/pages/(albums)/_components";
import {
  PlayButtonAction,
  PlaylistTrackList,
} from "@/pages/(cabinet)/_components";

import { PlayableContainer } from "@/styles/GlobalStyles";

const CabinetPlayListIdPage = () => {
  const [searchParams] = useSearchParams();
  const playlistId = useMemo(
    () => searchParams.get("playlistId"),
    [searchParams],
  );

  const { data, isLoading } = useQuery(getPlaylist(playlistId));

  if (!playlistId) return null;

  if (isLoading || !data) return null; // Skeleton
  const { playlist, own } = data;

  return (
    <PlayableContainer>
      <AlbumInfoWrapper>
        <AlbumArt
          imageUrl={
            playlist.thumbNail.length < 4
              ? playlist.thumbNail[0]
              : playlist.thumbNail
          }
        />

        <AlbumUtilsWrapper>
          <AlbumInfo
            albumName={playlist.playListName}
            albumType={"플레이리스트"}
            // artistName={album.artist.artistName}
            releasedAt={playlist.updatedAt}
            songCount={playlist.count}
            // genres={album.genres}
            // tracks={album.tracks}
          />
          {/* <AlbumActions album={playlist} isOwn={own} /> */}
          {own && (
            <PlayButtonAction
              playlistId={playlist.id}
              tracks={playlist.tracks}
            />
          )}
        </AlbumUtilsWrapper>
      </AlbumInfoWrapper>

      <PlaylistTrackList
        isOwn={own}
        tracks={playlist.tracks}
        trackListType={"LIST"}
        className="mt-8"
      />
    </PlayableContainer>
  );
};

export default CabinetPlayListIdPage;
