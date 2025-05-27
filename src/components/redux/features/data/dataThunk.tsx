import { AppDispatch, RootState } from "../../store/configureStore";
import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
} from "./dataSlice";
import { fetchDataApi } from "../../api/fetchDataApi"

export const fetchData = () => async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  const { isDataFetched } = getState().data;
  if (!isDataFetched) {
    dispatch(fetchDataStart());
  }

  try {
    const data = await fetchDataApi();
    dispatch(fetchDataSuccess(data));
  } catch (error: any) {
    dispatch(fetchDataFailure(error.message));
  }
};
