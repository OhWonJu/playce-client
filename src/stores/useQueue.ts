import { create } from "zustand";

import { Track } from "@/types";

export type QUEUE_ACTION =
  | { type: "SET_QUEUE"; queue: Track[] }
  | { type: "ADD_TRACK"; track: Track }
  | { type: "DELETE_TRACK"; track: Track }
  | { type: "INIT_QUEUE" };

interface QueueStore {
  queue: Track[];
  songCount: number;
  totalPlayTime: number;

  setQueue: (queue: Track[]) => void;
  addTrack: (track: Track) => void;
  deleteTrack: (track: Track) => void;
  initQueue: () => void;
}

export const useQueue = create<QueueStore>((set, get) => ({
  queue: [],
  songCount: 0,
  totalPlayTime: 0,

  setQueue: (queue: Track[]) =>
    set({
      queue,
      songCount: queue.length,
      totalPlayTime: queue.reduce((acc, cur) => acc + cur.trackTime, 0),
    }),

  addTrack: (track: Track) => {
    const { queue, songCount, totalPlayTime } = get();

    const newTrack = track;
    const newQueue = [...queue];

    const existTrack = newQueue.findIndex(
      track => track.trackTitle === newTrack.trackTitle,
    );

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
}));
