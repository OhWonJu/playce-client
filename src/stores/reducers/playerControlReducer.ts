import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Track } from "@/types";

import type {
  PLAYER_CONTROL_ACTION,
  PLAYER_FORWARD_MODE,
  PLAYER_REPEAT_MODE,
  PLAY_LIST_TYPE,
} from "../reduxTypes/playerControlType";

export type PlayerControlStateType = {
  play: boolean;
  shuffle: boolean;
  repeatMode: PLAYER_REPEAT_MODE;
  forwardMode: PLAYER_FORWARD_MODE;
  forwardTrigger: number;
  originTrackId: string;
  originTrackList: Track[];
  playList: Track[];
  playListType: PLAY_LIST_TYPE;
  currentTrack: Track;
  totalTime: number;
};

const initialState: PlayerControlStateType = {
  play: false,
  shuffle: false,
  repeatMode: "NONE",
  forwardMode: "INIT",
  forwardTrigger: 0,
  originTrackId: null,
  originTrackList: [],
  currentTrack: null,
  playList: [],
  playListType: "ALBUM",
  totalTime: 0,
};

const playerControlSlice = createSlice({
  name: "playControl",
  initialState,
  reducers: {
    playerControlReducer(state, aciton: PayloadAction<PLAYER_CONTROL_ACTION>) {
      switch (aciton.payload.type) {
        case "SET_PLAY": {
          return {
            ...state,
            play: aciton.payload.play,
          };
        }
        case "SET_SHUFFLE": {
          return {
            ...state,
            shuffle: aciton.payload.shuffle,
          };
        }
        case "SET_REPEAT_MODE": {
          return {
            ...state,
            repeatMode: aciton.payload.repeatMode,
          };
        }
       // 트랙 변경 요쳥이 이전 변경 요청과 다름을 명시하기 위한 트리거
        case "SET_FORWARD_TRIGGER": {
          const newForwardTrigger = state.forwardTrigger === 0 ? 1 : 0;
          return {
            ...state,
            forwardTrigger: newForwardTrigger,
          };
        }
        // 셔플 등으로 트랙 리스트의 정보를 변경해야 하는 경우 원본 트랙 리스트를 유지
        // -> 셔플,비셔플,셔플 과 같은 요청을 처리하기 위함
        case "SET_ORIGIN_TRACK_LIST": {
          return {
            ...state,
            originTrackId: aciton.payload.originTrackId,
            originTrackList: aciton.payload.originTrackList,
          };
        }
        case "SET_CURRENT_TRACK": {
          return {
            ...state,
            currentTrack: aciton.payload.currentTrack,
          };
        }
        case "SET_PLAY_LIST": {
          return {
            ...state,
            playList: aciton.payload.playList,
          };
        }
        // 앨범, 큐, 플레이리스트 구분
        case "SET_PLAY_LIST_TYPE": {
          return {
            ...state,
            playListType: aciton.payload.playListType,
          };
        }
        case "ADD_TRACK": {
          const newTrack = aciton.payload.track;
          const newOriginPlayList = [...state.originTrackList];
          const newPlayList = [...state.playList];

          // 추가되는 트랙이 이미 플레이리스트에 존재하는 경우 추가를 하지 않음
          // 트랙 삭제시 로직을 findIndex 로만 해결할 수 있도록 하기 위함.
          const existTrack = newPlayList.findIndex(
            track => track.trackTitle === newTrack.trackTitle,
          );

          if (existTrack === -1) {
            newOriginPlayList.push(newTrack);
            newPlayList.push(newTrack);
            return {
              ...state,
              originTrackList: newOriginPlayList,
              playList: newPlayList,
            };
          } else return { ...state };
        }
        case "DELETE_TRACK": {
          const deletedTrack = aciton.payload.track;
          const deletedTrackIndex = state.playList.findIndex(
            track => track.trackTitle === deletedTrack.trackTitle,
          );

          if (deletedTrackIndex !== -1) {
            const deletedOriginTrackIndex = state.originTrackList.findIndex(
              track => track.trackTitle === deletedTrack.trackTitle,
            );

            const newOriginPlayList = [...state.originTrackList];
            const newPlayList = [...state.playList];

            newOriginPlayList.splice(deletedOriginTrackIndex, 1);
            newPlayList.splice(deletedTrackIndex, 1);
            
            return {
              ...state,
              originTrackList: newOriginPlayList,
              playList: newPlayList,
            };
          } else return { ...state };
        }
        case "SET_TOTAL_TIME": {
          return {
            ...state,
            totalTime: aciton.payload.totalTime,
          };
        }
      }
    },
  },
});

export const playerControlActions = playerControlSlice.actions;

export default playerControlSlice.reducer;
