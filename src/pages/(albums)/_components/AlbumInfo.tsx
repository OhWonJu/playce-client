import React, { useMemo } from "react";

import { GenrePreview, Track } from "@/types";

import { AlbumInfoBox } from "./albumInfo.styles";

interface AlbumInfoProps {
  albumName: string;
  artistName: string;
  albumType: string;
  // releaseDate: string;
  genres: GenrePreview[];
  tracks: Track[];
}

const AlbumInfo = ({
  albumName,
  albumType,
  artistName,
  genres,
  tracks,
}: AlbumInfoProps) => {
  const totalTimes = useMemo(
    () => tracks.reduce((acc, cur) => acc + cur.trackTime, 0),
    [tracks],
  );

  const genresContent = useMemo(
    () => genres.reduce((acc, cur) => acc + `${cur.genre}`, ""),
    [genres],
  );

  return (
    <AlbumInfoBox>
      <span className="font-extrabold text-3xl truncate line-clamp-1">
        {albumName}
      </span>
      <span className="font-extrabold truncate line-clamp-1">{artistName}</span>
      <a className="text-zinc-400 font-semibold text-sm">{albumType} • 2022</a>
      <a className="text-zinc-400 font-semibold text-sm">{genresContent}</a>
      <div className="flex space-x-2">
        <a className="text-zinc-400 font-semibold text-sm">
          {tracks?.length} 곡 • {Math.round(totalTimes / 60)} 분
        </a>
      </div>
    </AlbumInfoBox>
  );
};

export default AlbumInfo;
