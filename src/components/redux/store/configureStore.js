import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/data/dataSlice";
import { thunk } from "redux-thunk"; // Importing 'thunk' directly from 'redux-thunk'

const customizedMiddleware = (getDefaultMiddleware) => {
  return getDefaultMiddleware().concat(thunk);
};
const store = configureStore({
  reducer: {
    data: dataReducer,
  },
  middleware: customizedMiddleware,
});

export default store;
