import { queryOptions } from "@tanstack/react-query";

import { _GET, _POST, _PUT } from "@/api/rootAPI";
import { MutationResponse } from "@/api/axios/axiosInstance.types";

import { Queue } from "@/types";

export interface CurrentUserResponse {
  id: string;
  nickName?: string;
  image?: string;
  currentPlayListId?: string;
  currentPlayTime: number;
  currentTrackId?: string;
}

export interface GetSummaryResponse {
  queue: Queue;
  myAlbums: {
    id: string;
    albumName: string;
    albumArtURL: string;
    artist: {
      artistName: string;
    };
  }[];
  myPlayList: {
    id: string;
    playListName: string;
    thumbNail: string[];
  }[];
}

export interface LogOutResponse extends MutationResponse {}

export interface UserCreateConfirmRequest {
  nickName: string;
  email: string;
  hashedPassword: string;
}

export const usersQueryKeys = {
  currentUser: ["users", "currentUser"] as const,
  logout: ["users", "logout"] as const,
  getSummary: ["users", "summary"] as const,
  getQueue: ["users", "queue"] as const,
};

export function getCurrentUser(flag: boolean | undefined) {
  return queryOptions({
    queryKey: usersQueryKeys.currentUser,
    queryFn: async () => _GET<CurrentUserResponse>("/users/me"),
    enabled: flag,
    retry: 3,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}

export function getSummary(flag: boolean | undefined) {
  return queryOptions({
    queryKey: usersQueryKeys.getSummary,
    queryFn: async () => _GET<GetSummaryResponse | undefined>("/users/summary"),
    enabled: !!flag,
  });
}

export function getQueue(flag: boolean | undefined) {
  return queryOptions({
    queryKey: usersQueryKeys.getQueue,
    queryFn: async () => _GET<Queue>("/users/queue"),
    enabled: !!flag,
  });
}

export async function logOutMutate() {
  const res = await _PUT<LogOutResponse>("/users/logout");

  if (!res.ok) throw new Error(res.errorCode);
  else return res;
}

export async function userCreateConfirm(data: UserCreateConfirmRequest) {
  const res = await _PUT<MutationResponse>("/users/create/confirm", data);

  if (!res.ok) throw new Error(res.errorCode);
  else return res;
}
