import React, { useMemo, useRef } from "react";
import { format } from "date-fns";

import { GenrePreview, Track } from "@/types";

import { AlbumInfoBox } from "./albumInfo.styles";

interface AlbumInfoProps {
  albumName: string;
  artistName: string;
  albumType: string;
  releasedAt?: Date;
  genres: GenrePreview[];
  tracks: Track[];
}

const DATE_FORMAT = "yyyy.MM";

const AlbumInfo = ({
  albumName,
  albumType,
  artistName,
  releasedAt,
  genres,
  tracks,
}: AlbumInfoProps) => {
  const boxRef = useRef(null);

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
      <span className="font-extrabold text-3xl">{albumName}</span>
      <span className="font-extrabold">{artistName}</span>
      <a className="text-zinc-400 font-semibold text-sm">
        {albumType}
        {releasedAt && `• ${format(releasedAt, DATE_FORMAT)}`}
      </a>
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
