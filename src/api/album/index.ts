import { queryOptions } from "@tanstack/react-query";
import { AlbumInfo } from "@/types";

import { _GET } from "../rootAPI";

export interface AlbumInfoResponse {
  album: AlbumInfo;
  own: boolean;
}

export const albumsQueryKeys = {
  albumInfo: (albumId?: string | null) => ["albums", albumId] as const,
  recommendedAlbums: ["albums", "recommend"] as const,
};

export function getAlbumInfo(albumId?: string | null) {
  return queryOptions({
    queryKey: albumsQueryKeys.albumInfo(albumId),
    queryFn: async () =>
      _GET<AlbumInfoResponse | undefined>(`/albums/${albumId}`),
    enabled: !!albumId,
  });
}

export function getRecommnededAlbums() {
  return queryOptions({
    queryKey: albumsQueryKeys.recommendedAlbums,
    queryFn: async () => _GET<AlbumInfo[]>("/albums/recommend"),
  });
}
