import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { PLAY_TIME_ACTION } from "../reduxTypes/playTimeType";

export type PlayTimeStateType = {
  totalTime: number;
  playTime: number;
};

const initialState: PlayTimeStateType = {
  totalTime: 0,
  playTime: 0,
};

const playTimeSlice = createSlice({
  name: "playTime",
  initialState,
  reducers: {
    playTimeReducer(state, aciton: PayloadAction<PLAY_TIME_ACTION>) {
      switch (aciton.payload.type) {
        case "SET_PLAY_TIME": {
          return {
            ...state,
            playTime: aciton.payload.playTime,
          };
        }
      }
    },
  },
});

export const playTimeActions = playTimeSlice.actions;

export default playTimeSlice.reducer;
