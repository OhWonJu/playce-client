import { Track } from "@/types";

export type QUEUE_ACTION =
  | { type: "SET_QUEUE"; queue: Track[] }
  | { type: "ADD_TRACK"; track: Track }
  | { type: "DELETE_TRACK"; track: Track }
  | { type: "INIT_QUEUE" };
