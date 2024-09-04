import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";


const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  return store;
};

const reduxStore = createStore();
export type RootState = ReturnType<typeof reduxStore.getState>;

export default reduxStore;


