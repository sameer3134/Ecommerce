import { db } from "../../../components/Admin/firebase/setup"
import { collection, getDocs } from "firebase/firestore";

export async function fetchDataApi() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(productList)
    return productList;
  } catch (error) {
    if (error) {
      console.log("eror", );
    }
  }
}
