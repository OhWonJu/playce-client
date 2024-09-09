import { Playlist, PlaylistSimple } from "@/types";
import { MutationResponse } from "../axios/axiosInstance.types";
import { _GET, _PATCH, _POST } from "../rootAPI";
import { queryOptions } from "@tanstack/react-query";

export interface GetPlaylistsResponse {
  items: any;
  playlists: PlaylistSimple[];
  nextCursor?: string;
}

export interface CreatePlaylistRequest {
  playListName?: string;
  isPublic?: boolean;
}

export interface UpdatePlaylistTrackRequest {
  isAdd?: boolean;
  trackId?: string;
}

export const playlistsQueryKeys = {
  playlists: (userId?: string | null) => ["playlists", userId],
  playlist: (playlistId?: string | null) => ["playlist", playlistId] as const,
};

export function getPlaylist(playlistId: string | undefined) {
  return queryOptions({
    queryKey: playlistsQueryKeys.playlist(playlistId),
    queryFn: async () =>
      _GET<{ playlist: Playlist; own: boolean }>(
        `/users/playlist/list/${playlistId}`,
      ),
    enabled: !!playlistId,
  });
}

export async function createNewPlaylist(data: CreatePlaylistRequest) {
  const res = await _POST<MutationResponse>("/users/create/playlist", data);

  if (!res.ok) throw new Error(res.errorCode);
  else return res;
}

export async function updatePlaylistTrack({
  playlistId,
  data,
}: {
  playlistId: string;
  data: UpdatePlaylistTrackRequest;
}) {
  const res = await _PATCH<MutationResponse>(
    `/users/update/playlist/${playlistId}`,
    data,
  );

  if (!res.ok) throw new Error(res.errorCode);
  else return res;
}
