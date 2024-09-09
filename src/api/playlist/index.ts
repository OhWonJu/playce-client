import { PlaylistSimple } from "@/types";
import { MutationResponse } from "../axios/axiosInstance.types";
import { _POST } from "../rootAPI";

export interface GetPlaylistsResponse {
  items: any;
  playlists: PlaylistSimple[];
  nextCursor?: string;
}

export interface CreatePlaylistRequest {
  playListName?: string;
  isPublic?: boolean;
}

export const playlistsQueryKeys = {
  playlists: (userId?: string | null) => ["playlists", userId],
};

export async function createNewPlaylist(data: CreatePlaylistRequest) {
  const res = await _POST<MutationResponse>("/users/create/playlist", data);

  if (!res.ok) throw new Error(res.errorCode);
  else return res;
}
