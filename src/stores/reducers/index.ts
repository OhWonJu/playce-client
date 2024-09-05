import { combineReducers } from "@reduxjs/toolkit";

// reducers  //
import playerControlReducer from "./playerControlReducer";
import queueReducer from "./queueReducer";

// actions //
export { playerControlActions } from "./playerControlReducer";
export { queueActions } from "./queueReducer";

const rootReducer = combineReducers({
  playerControl: playerControlReducer,
  queue: queueReducer,
});

export default rootReducer;
