import { queryOptions } from "@tanstack/react-query";

import { _GET, _POST, _PUT } from "@/api/rootAPI";
import { MutationResponse } from "@/api/axios/axiosInstance.types";
import { ERROR_CODE } from "../errorCode";

export interface CurrentUserResponse {
  id: string;
  nickName?: string;
  image?: string;
  currentPlayListId?: string;
  currentPlayTime: number;
  currentTrackId?: string;
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
};

export function getCurrentUser(flag: boolean) {
  return queryOptions({
    queryKey: usersQueryKeys.currentUser,
    queryFn: async () => _GET<CurrentUserResponse>("/users/me"),
    enabled: flag,
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
