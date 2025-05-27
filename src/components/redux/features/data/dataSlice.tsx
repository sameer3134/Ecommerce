import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  [key: string]: any;
}

interface DataState {
  loading: boolean;
  data: Product[] | null;
  error: string | null;
  isDataFetched: boolean;
}

const initialState: DataState = {
  loading: false,
  data: null,
  error: null,
  isDataFetched: false,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<Product[]>) {
      state.loading = false;
      state.data = action.payload;
      state.isDataFetched = true;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
} = dataSlice.actions;

export default dataSlice.reducer;
