import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../features/data/dataThunk";
import {
  selectData,
  selectLoading,
  selectError,
} from "../features/data/dataSelector";
import { AppDispatch } from "../store/configureStore";

const useData = () => {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (!data) {
      dispatch(fetchData());
    }
  }, [data, dispatch]);

  return { data, loading, error };
};

export default useData;
