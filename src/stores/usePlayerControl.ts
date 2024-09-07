import { AlbumInfo, Track } from "@/types";
import { create } from "zustand";

export type PLAY_LIST_TYPE = "ALBUM" | "LIST" | "QUEUE";
export type PLAYER_REPEAT_MODE = "NONE" | "REPEAT" | "REPEAT_ALL";
export type PLAYER_FORWARD_MODE = "INIT" | "FORWARD" | "BACKWARD" | "RESTART";

interface PlayerControlStore {
  play: boolean;
  shuffle?: boolean;
  repeatMode: PLAYER_REPEAT_MODE;
  forwardMode: PLAYER_FORWARD_MODE;
  forwardTrigger: number;

  originTrackId: string;
  originTrackList: Track[];
  playList: Track[];
  playListType: PLAY_LIST_TYPE;
  currentTrack: Track;

  setPlay: (play: boolean) => void;
  setShuffle: (shuffle: boolean) => void;
  setRepeatMode: (repeatMode: PLAYER_REPEAT_MODE) => void;
  setForwardTrigger: () => void;
  doShuffle: (list: Track[]) => void;
  handlePlayListClick: (
    playListType: PLAY_LIST_TYPE,
    album: AlbumInfo | { id: string; tracks: Track[] },
  ) => void;

  setOriginTrackList: (originTrackId: string, originTrackList: Track[]) => void;
  setPlayList: (playList: Track[]) => void;
  setPlayListType: (playListType: PLAY_LIST_TYPE) => void;
  setCurrentTrack: (currentTrack: Track) => void;
  addTrack: (track: Track) => void;
  deleteTrack: (track: Track) => void;
}

export const usePlayerControl = create<PlayerControlStore>((set, get) => ({
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

  setPlay: (play: boolean) => set({ play }),

  setShuffle: (shuffle: boolean) => set({ shuffle }),

  setRepeatMode: (repeatMode: PLAYER_REPEAT_MODE) => set({ repeatMode }),

  setForwardTrigger: () => {
    const newForwardTrigger = get().forwardTrigger === 0 ? 1 : 0;
    return set({ forwardTrigger: newForwardTrigger });
  },

  doShuffle: (list: Track[]) => {
    const {
      shuffle,
      currentTrack,
      setPlayList,
      setCurrentTrack,
      originTrackList,
    } = get();

    if (shuffle) {
      const currentIndex = list.findIndex(
        track => track.trackTitle === currentTrack.trackTitle,
      );

      const prevList = [...list];

      if (currentIndex !== -1) prevList.splice(currentIndex, 1);

      // Fisher-Yates Shuffle
      for (let i = prevList.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [prevList[i], prevList[j]] = [prevList[j], prevList[i]];
      }

      const shuffledList =
        currentIndex !== -1 ? [currentTrack, ...prevList] : [...prevList];

      setPlayList(shuffledList);
      setCurrentTrack(currentIndex === -1 ? shuffledList[0] : currentTrack);
    } else {
      setPlayList(get().originTrackList);
      setCurrentTrack(
        currentTrack === null ? originTrackList[0] : currentTrack,
      );
    }
  },

  handlePlayListClick: (
    playListType: PLAY_LIST_TYPE,
    album: AlbumInfo | { id: string; tracks: Track[] },
  ) => {
    const {
      setPlayListType,
      currentTrack,
      setOriginTrackList,
      setCurrentTrack,
      setPlayList,
    } = get();

    setPlayListType(playListType);

    const TrackList = album.tracks;

    const currentIndex = currentTrack
      ? TrackList.findIndex(
          (track: any) => track.trackTitle === currentTrack.trackTitle,
        )
      : -1;

    if (currentIndex === -1) get().setPlay(false);
    setOriginTrackList(album.id, TrackList);
    setCurrentTrack(currentIndex === -1 ? TrackList[0] : currentTrack);

    if (get().shuffle) {
      get().doShuffle(TrackList);
    } else {
      setPlayList(TrackList);
    }

    setTimeout(() => get().setPlay(true), 800);
  },

  setOriginTrackList: (originTrackId: string, originTrackList: Track[]) =>
    set({ originTrackId, originTrackList }),

  setPlayList: (playList: Track[]) => set({ playList }),

  setPlayListType: (playListType: PLAY_LIST_TYPE) => set({ playListType }),

  setCurrentTrack: (currentTrack: Track) => set({ currentTrack }),

  addTrack: (track: Track) => {
    const { originTrackList, playList } = get();

    const newTrack = track;
    const newOriginPlayList = [...originTrackList];
    const newPlayList = [...playList];

    // 추가되는 트랙이 이미 플레이리스트에 존재하는 경우 추가를 하지 않음
    // 트랙 삭제시 로직을 findIndex 로만 해결할 수 있도록 하기 위함.
    const existTrack = newPlayList.findIndex(
      track => track.trackTitle === newTrack.trackTitle,
    );

    if (existTrack === -1) {
      newOriginPlayList.push(newTrack);
      newPlayList.push(newTrack);

      return set({ originTrackList: newOriginPlayList, playList: newPlayList });
    }
  },

  deleteTrack: (track: Track) => {
    const { originTrackList, playList } = get();

    const deletedTrack = track;
    const deletedTrackIndex = playList.findIndex(
      track => track.trackTitle === deletedTrack.trackTitle,
    );

    if (deletedTrackIndex !== -1) {
      const deletedOriginTrackIndex = originTrackList.findIndex(
        track => track.trackTitle === deletedTrack.trackTitle,
      );

      const newOriginPlayList = [...originTrackList];
      const newPlayList = [...playList];

      newOriginPlayList.splice(deletedOriginTrackIndex, 1);
      newPlayList.splice(deletedTrackIndex, 1);

      return set({
        originTrackList: newOriginPlayList,
        playList: newPlayList,
      });
    }
  },
}));
