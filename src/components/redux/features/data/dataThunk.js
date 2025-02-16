import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
} from "./dataSlice";
import { fetchDataApi } from "../../api/fetchDataApi";

export const fetchData = () => async (dispatch, getState) => {
  const { isDataFetched } = getState().data;

  if (!isDataFetched) {
    //check if data is not already fetched
    dispatch(fetchDataStart());
  }
  try {
    const data = await fetchDataApi();
    dispatch(fetchDataSuccess(data));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};
