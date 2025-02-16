export const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const { id, size, qty } = action.payload;
            const existingProduct = state.cart.find(item => item.id === id && item.size === size);
            
            if (existingProduct) {
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === id && item.size === size
                            ? { ...item, qty: item.qty + qty } // ✅ Increase by provided qty
                            : item
                    )
                };
            } else {
                return { 
                    ...state, 
                    cart: [...state.cart, { ...action.payload }] // ✅ Use qty from payload
                };
            }
        }

        case "REMOVE_FROM_CART":
            return { 
                ...state, 
                cart: state.cart.filter(item => !(item.id === action.payload.id && item.size === action.payload.size)) 
            };

            case "CHANGE_CART_QTY":
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload.id && item.size === action.payload.size
                            ? { ...item, qty: Number(action.payload.qty) } // Ensure correct qty update
                            : item
                    )
                };
            
        default:
            return state;
    }
};



// export const productReducer=(state,action)=>{
//     switch (action.type) {
//         case "SORT_BY_PRICE":
//             return {...state, sort:action.payload};
//         case "FILTER_BY_STOCK":
//             return {...state, byStock:!state.byStock};
//         case "FILTER_BY_DELIVERY":
//             return {...state, byFastDelivery:!state.byFastDelivery};
//         case "FILTER_BY_RATING":
//             return {...state, byRating:action.payload};
        
//         case "CLEAR_FILTERS":
//             return{
//                 byStock:false,
//                 byFastDelivery:false,
//                 byRating:0,
//                 searchQuery:""  
//             }
//         default:
//             return state;
//     }

// };