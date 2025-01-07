import { configureStore } from "@reduxjs/toolkit";
import noodleGifSlice from "./slices/noodleGifSlice";
import noodleReducer from "./slices/noodleCountSlice";
import userReducer from "./slices/userSlice";
const store = configureStore({
  reducer: {
    noodleGif: noodleGifSlice,
    noodleCount: noodleReducer,
    userData: userReducer,
  },
});

// Define the type of the root state
export type RootState = ReturnType<typeof store.getState>;

export default store;
