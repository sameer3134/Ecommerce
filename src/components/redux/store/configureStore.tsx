import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/data/dataSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer, // 👈 The 'data' slice of state
  },
});

// 🔁 Types for usage in components & thunks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
