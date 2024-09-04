import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Track } from "@/types";

import { QUEUE_ACTION } from "../reduxTypes/queueType";

export type QueueStateType = {
  queue: Track[];
};

const initialState: QueueStateType = {
  queue: [],
};

const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    queueReducer(state, action: PayloadAction<QUEUE_ACTION>) {
      switch (action.payload.type) {
        case "SET_QUEUE": {
          return {
            queue: action.payload.queue,
          };
        }
        case "ADD_TRACK": {
          const newTrack = action.payload.track;
          const newQueue = [...state.queue];

          const existTrack = newQueue.findIndex(
            track => track.trackTitle === newTrack.trackTitle,
          );

          if (existTrack === -1) {
            newQueue.push(newTrack);
            return { queue: newQueue };
          } else {
            return {
              ...state,
            };
          }
        }
        case "DELETE_TRACK": {
          const deletedTrackId = action.payload.track.trackTitle;
          const deletedTrackIndex = state.queue.findIndex(
            track => track.trackTitle === deletedTrackId,
          );

          if (deletedTrackIndex !== -1) {
            const newQueue = [...state.queue];
            newQueue.splice(deletedTrackIndex, 1);
            return {
              queue: newQueue,
            };
          } else {
            return {
              ...state,
            };
          }
        }
        case "INIT_QUEUE": {
          return {
            queue: [],
          };
        }
      }
    },
  },
});

export const queueActions = queueSlice.actions;

export default queueSlice.reducer;
