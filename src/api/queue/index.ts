import { MutationResponse } from "../axios/axiosInstance.types";
import { _PATCH } from "../rootAPI";

export interface UpdateQueueRequest {
  isAdd: boolean;
  trackId: string;
}

export async function updateQueue(data: UpdateQueueRequest) {
  const res = await _PATCH<MutationResponse>("/users/update/queue", data);

  if (!res.ok) throw new Error(res.errorCode);
  else return res;
}
