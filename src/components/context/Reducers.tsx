import { CartAction, CartStateType } from "./contextTypes";

export const cartReducer = (state: CartStateType, action: CartAction): CartStateType => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { id, size, qty } = action.payload;
      const existingProduct = state.cart.find(item => item.id === id && item.size === size);

      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === id && item.size === size
              ? { ...item, qty: item.qty + qty }
              : item
          )
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload }]
        };
      }
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          item => !(item.id === action.payload.id && item.size === action.payload.size)
        )
      };

    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, qty: action.payload.qty }
            : item
        )
      };

    default:
      return state;
  }
};
