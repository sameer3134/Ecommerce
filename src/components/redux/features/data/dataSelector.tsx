import { RootState } from "../../store/configureStore";

export const selectData = (state: RootState) => state.data.data;
export const selectLoading = (state: RootState) => state.data.loading;
export const selectError = (state: RootState) => state.data.error;
