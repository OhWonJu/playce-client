import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import { UpdateQueueRequest } from "@/api/queue";
import { _PATCH } from "@/api/rootAPI";

import { Track } from "@/types";

import type { RootState } from "@/stores/reduxStore";
import { queueActions } from "@/stores/reducers";

export const useQueue = () => {
  // TODO : 큐에 트랙 추가시마다 API 호출이 아닌 특정 배치마다 하는 방식으로 리팩토링
  // 최초 큐 데이터를 받아오면 전역 상태화 - 전역 상태에 정보 갱신 후 - 배치시 호출하는 방식
  const mutation = useMutation({
    mutationFn: async (formData: UpdateQueueRequest) =>
      await _PATCH("/users/update/queue", formData),
    // onSuccess: data => {
    //   // console.log("SUCCESS: ", data);
    // },
  });

  const dispatch = useDispatch();

  const { queue, songCount, totalPlayTime } = useSelector(
    ({ queue }: RootState) => queue,
  );

  const setQueue = useCallback(
    (queue: Array<Track>) =>
      dispatch(
        queueActions.queueReducer({
          type: "SET_QUEUE",
          queue,
        }),
      ),
    [dispatch],
  );

  const addTrack = useCallback(
    (track: Track) => {
      // QueueToast({ track, isInQueue: true });
      dispatch(queueActions.queueReducer({ type: "ADD_TRACK", track }));
      mutation.mutate({ isAdd: true, trackId: track.id });
    },
    [dispatch],
  );

  const deleteTrack = useCallback(
    (track: Track) => {
      // QueueToast({ track, isInQueue: false });
      dispatch(queueActions.queueReducer({ type: "DELETE_TRACK", track }));
      mutation.mutate({ isAdd: false, trackId: track.id });
    },
    [dispatch],
  );

  const initQueue = useCallback(
    () => dispatch(queueActions.queueReducer({ type: "INIT_QUEUE" })),
    [dispatch],
  );

  const context = {
    queue,
    songCount,
    totalPlayTime,
    setQueue: (queue: Track[]) => setQueue(queue),
    addTrack: (track: Track) => addTrack(track),
    deleteTrack: (track: Track) => deleteTrack(track),
    initQueue: () => initQueue(),
  };

  return context;
};
