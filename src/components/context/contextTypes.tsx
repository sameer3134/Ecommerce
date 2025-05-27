export interface CartItemType {
  id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  image: string;
  imagetwo:string;
  imagethree:string;
  imagefour:string;
  price: string;
  additionalInfo: string;
  sizes: {
    [key in SizeType]?: number;
  };
  size: SizeType; // 👈 required for cart logic
  qty: number;
  }
  
  export type SizeType = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL';

  export type CartStateType = {
    cart: CartItemType[];
  };
  
  export type CartAction =
    | { type: "ADD_TO_CART"; payload: CartItemType }
    | { type: "REMOVE_FROM_CART"; payload: { id: string; size: string } }
    | { type: "CHANGE_CART_QTY"; payload: { id: string; size: string; qty: number } };
  