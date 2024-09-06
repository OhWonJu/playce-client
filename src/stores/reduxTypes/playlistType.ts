import { Track } from "@/types";

export type PLAY_LIST_TYPE = "ALBUM" | "LIST" | "QUEUE";

export type PLAY_LIST_ACTION =
  | {
      type: "SET_ORIGIN_TRACK_LIST";
      originTrackId: string;
      originTrackList: Track[];
    }
  | { type: "SET_PLAY_LIST"; playList: Track[] }
  | { type: "SET_PLAY_LIST_TYPE"; playListType: PLAY_LIST_TYPE }
  | { type: "ADD_TRACK"; track: Track }
  | { type: "DELETE_TRACK"; track: Track }
  | { type: "SET_CURRENT_TRACK"; currentTrack: Track };
