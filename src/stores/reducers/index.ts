import { combineReducers } from "@reduxjs/toolkit";

// reducers  //
import playerControlReducer from "./playerControlReducer";
import playTimeReducer from "./playTimeReducer";
import queueReducer from "./queueReducer";

// actions //
export { playerControlActions } from "./playerControlReducer";
export { playTimeActions } from "./playTimeReducer";
export { queueActions } from "./queueReducer";

const rootReducer = combineReducers({
  playerControl: playerControlReducer,
  playTimeControl: playTimeReducer,
  queue: queueReducer,
});

export default rootReducer;
