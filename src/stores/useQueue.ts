import { create } from "zustand";

import { Track } from "@/types";

import { TrackToast } from "@/components/Toastify";

export type QUEUE_ACTION =
  | { type: "SET_QUEUE"; queue: Track[] }
  | { type: "ADD_TRACK"; track: Track }
  | { type: "DELETE_TRACK"; track: Track }
  | { type: "INIT_QUEUE" };

interface QueueStore {
  queue: Track[];
  songCount: number;
  totalPlayTime: number;
  queueThumbNail: string[];

  setQueue: (
    queue: Track[],
    totalPlayTime?: number,
    thumbnail?: string[],
  ) => void;
  addTrack: (track: Track) => void;
  deleteTrack: (track: Track) => void;
  initQueue: () => void;
  setQueueThumbNail: (thumbnail: string[]) => void;
}

export const useQueue = create<QueueStore>((set, get) => ({
  queue: [],
  songCount: 0,
  totalPlayTime: 0,
  queueThumbNail: [],

  setQueue: (queue: Track[], totalPlayTime?: number, thumbnail?: string[]) =>
    set({
      queue,
      songCount: queue.length,
      totalPlayTime:
        totalPlayTime ?? queue.reduce((acc, cur) => acc + cur.trackTime, 0),

      queueThumbNail: (thumbnail && thumbnail.length) > 0 ? thumbnail : [],
    }),

  addTrack: (track: Track) => {
    const { queue, songCount, totalPlayTime } = get();

    const newTrack = track;
    const newQueue = [...queue];

    const existTrack = newQueue.findIndex(
      track => track.trackTitle === newTrack.trackTitle,
    );

    TrackToast({ targetName: "큐", track, isAdd: true });

    if (existTrack === -1) {
      newQueue.push(newTrack);

      return set({
        queue: newQueue,
        songCount: songCount + 1,
        totalPlayTime: totalPlayTime + newTrack.trackTime,
      });
    }
  },

  deleteTrack: (track: Track) => {
    const { queue, songCount, totalPlayTime } = get();

    const deletedTrackId = track.trackTitle;
    const deletedTrackIndex = queue.findIndex(
      track => track.trackTitle === deletedTrackId,
    );

    TrackToast({ targetName: "큐", track, isAdd: false });

    if (deletedTrackIndex !== -1) {
      const newQueue = [...queue];
      const deletedTrack = newQueue.splice(deletedTrackIndex, 1);

      return set({
        queue: newQueue,
        songCount: songCount - 1,
        totalPlayTime: totalPlayTime - deletedTrack[0].trackTime,
      });
    }
  },

  initQueue: () => set({ queue: [], songCount: 0, totalPlayTime: 0 }),

  setQueueThumbNail: thumbnail => {
    return set({ queueThumbNail: thumbnail });
  },
}));
