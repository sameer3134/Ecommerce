import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../features/data/dataThunk";
import {
  selectData,
  selectLoading,
  selectError,
} from "../features/data/dataSelector";
const useData = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  useEffect(() => {
    //  fetch data only if it is not already available in the redux store
    if (!data) {
      dispatch(fetchData());
    }
  }, [data, dispatch]);
  return { data, loading, error };
};
export default useData;