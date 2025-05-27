
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../admin/firebase/setup";

interface Product {
  id: string;
  [key: string]: any;
}

export async function fetchDataApi(): Promise<Product[]> {
  const querySnapshot = await getDocs(collection(db, "products"));
  const productList: Product[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return productList;
}
