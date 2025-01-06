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
      <span className="font-bold text-3xl">{albumName}</span>
      <span className="font-bold">{artistName}</span>
      <p className="text-primary-foreground text-sm">
        {albumType && `${albumType} • `}
        {releasedAt && `${format(releasedAt, DATE_FORMAT)}`}
      </p>
      {genres && (
        <p className="text-primary-foreground text-sm">
          {genresContent.join(" • ")}
        </p>
      )}
      <div className="flex space-x-2">
        <p className="text-primary-foreground text-sm">
          {tracks && `${tracks?.length}곡 • ${Math.round(totalTimes / 60)}분`}
          {songCount && `${songCount}곡`}
          {totalPlayTime && ` • ${convertTime(totalPlayTime, "number")[0]}분`}
        </p>
      </div>
    </AlbumInfoBox>
  );
};

export default AlbumInfo;
