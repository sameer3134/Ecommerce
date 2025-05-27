import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { cartReducer } from "./Reducers";
import { CartItemType, CartStateType, CartAction } from "./contextTypes";

interface CartContextType {
  state: CartStateType;
  dispatch: React.Dispatch<CartAction>;
}

const Cart = createContext<CartContextType | undefined>(undefined);

const Context: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: [],
  });

  return (
    <Cart.Provider value={{ state, dispatch }}>
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const CartState = () => {
  const context = useContext(Cart);
  if (context === undefined) {
    throw new Error("CartState must be used within a Cart Provider");
  }
  return context;
};
