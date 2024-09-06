import { combineReducers } from "@reduxjs/toolkit";

// reducers  //
import playerControlReducer from "./playerControlReducer";
import playlistReducer from "./playlistReducer";
import queueReducer from "./queueReducer";

// actions //
export { playerControlActions } from "./playerControlReducer";
export { playlistActions } from "./playlistReducer";
export { queueActions } from "./queueReducer";

const rootReducer = combineReducers({
  playerControl: playerControlReducer,
  playlist: playlistReducer,
  queue: queueReducer,
});

export default rootReducer;
