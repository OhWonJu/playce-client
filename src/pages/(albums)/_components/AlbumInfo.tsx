import React, { useMemo } from "react";
import { format } from "date-fns";

import { GenrePreview, Track } from "@/types";

import { AlbumInfoBox } from "./albumInfo.styles";
import { convertTime } from "@/lib/utils";

interface AlbumInfoProps {
  albumName: string;
  artistName?: string;
  albumType?: string;
  releasedAt?: Date;
  genres?: GenrePreview[];
  tracks?: Track[];
  songCount?: number;
  totalPlayTime?: number;
}

const DATE_FORMAT = "yyyy.MM";

const AlbumInfo = ({
  albumName,
  albumType,
  artistName,
  releasedAt,
  genres,
  tracks,
  songCount,
  totalPlayTime,
}: AlbumInfoProps) => {
  const totalTimes = tracks
    ? useMemo(
        () => tracks.reduce((acc, cur) => acc + cur.trackTime, 0),
        [tracks],
      )
    : null;

  const genresContent = genres
    ? useMemo(() => genres.map(item => item.genre), [genres])
    : null;

  return (
    <AlbumInfoBox>
      <span className="font-extrabold text-3xl">{albumName}</span>
      <span className="font-bold">{artistName}</span>
      <a className="text-zinc-400 font-medium text-sm">
        {albumType && `${albumType} • `}
        {releasedAt && `${format(releasedAt, DATE_FORMAT)}`}
      </a>
      {genres && (
        <a className="text-zinc-400 font-medium text-sm">
          {genresContent.join(" • ")}
        </a>
      )}
      <div className="flex space-x-2">
        <a className="text-zinc-400 font-medium text-sm">
          {tracks && `${tracks?.length}곡 • ${Math.round(totalTimes / 60)}분`}
          {songCount && `${songCount}곡`}
          {totalPlayTime && ` • ${convertTime(totalPlayTime, "number")[0]}분`}
        </a>
      </div>
    </AlbumInfoBox>
  );
};

export default AlbumInfo;
