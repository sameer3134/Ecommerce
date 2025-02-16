import { createSlice } from "@reduxjs/toolkit";
const dataSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: null,
    error: null,
    isDataFetched: false, //Add flag to indicate data availablity
  },
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      state.isDataFetched = true; // Set flag to true when data is fetched
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure
} = dataSlice.actions;
export default dataSlice.reducer;
