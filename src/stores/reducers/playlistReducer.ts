import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Track } from "@/types";

import { PLAY_LIST_ACTION } from "../reduxTypes";
import type { PLAY_LIST_TYPE } from "../reduxTypes/playlistType";

export type PlaylistStateType = {
  originTrackId: string;
  originTrackList: Track[];
  playList: Track[];
  playListType: PLAY_LIST_TYPE;
  currentTrack: Track;
};

const initialState: PlaylistStateType = {
  originTrackId: null,
  originTrackList: [],
  currentTrack: null,
  playList: [],
  playListType: "ALBUM",
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    playlistReducer(state, aciton: PayloadAction<PLAY_LIST_ACTION>) {
      switch (aciton.payload.type) {
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
      }
    },
  },
});

export const playlistActions = playlistSlice.actions;

export default playlistSlice.reducer;
