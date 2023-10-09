import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItemType } from "../../types/CartItemType";
import { CartsType } from "../../types/CartsType";

type Initials = {
    cart: CartsType | null;
    isLoading: boolean;
    error: null;
    cartItems: CartItemType[] | null;
    handleAddItemToCart: unknown | null;
    deleteCartItem: unknown | null;
    updateCartItem: unknown | null;
};
const initialState: Initials = {
    cart: null,
    isLoading: false,
    error: null,
    cartItems: null,
    handleAddItemToCart: null,
    deleteCartItem: null,
    updateCartItem: null,
};

const cartSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addItemToCartRequest(state) {
            state.isLoading = true;
            state.error = null;
        },
        addItemToCartSuccess(state, action: PayloadAction<unknown>) {
            state.cartItems = [state.cartItems, action.payload?.cartItems];
            state.isLoading = false;
            state.handleAddItemToCart = action.payload;
        },

        addItemToCartFailure(state) {
            state.isLoading = false;
            state.error = null;
        },

        getCartRequest(state) {
            state.isLoading = true;
        },
        getCartSuccess(state, action: PayloadAction<unknown>) {
            state.isLoading = false;
            state.cartItems = action.payload?.cartItems;
            state.cart = action.payload;
        },
        getCartFailure(state) {
            state.isLoading = false;
            state.error = null;
        },

        removeCartItemRequest(state) {
            state.isLoading = true;
            state.error = null;
        },
        removeCartItemSuccess(state, action: PayloadAction<unknown>) {
            state.isLoading = false;
            state.deleteCartItem = action.payload;
        },
        removeCartItemFailure(state) {
            state.isLoading = false;
            state.error = null;
        },

        updateCartItemRequest(state) {
            state.isLoading = true;
            state.error = null;
        },
        updateCartItemSuccess(state, action: PayloadAction<unknown>) {
            state.isLoading = false;
            state.updateCartItem = action.payload;
        },
        updateCartItemFailure(state) {
            state.isLoading = false;
            state.error = null;
        },
    },
});

// export const cartReducer = (state = initials, action: CartAction) => {
//     switch (action.type) {
//         case ADD_ITEM_TO_CART_REQUEST:
//             return { ...state, loading: true, error: null };

//         case ADD_ITEM_TO_CART_SUCCESS:
//             return {
//                 ...state,
//                 cartItems: [...state.cartItems, action.payload?.cartItems],
//                 loading: false,
//                 handleAddItemToCart: action.payload,
//             };

//         case ADD_ITEM_TO_CART_FAILURE:
//             return { ...state, loading: false, error: action.payload };

//         case GET_CART_REQUEST:
//             return { ...state, loading: true };

//         case GET_CART_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 cartItems: action.payload?.cartItems,
//                 cart: action.payload,
//             };

//         case GET_CART_FAILURE:
//             return { ...state, loading: false, error: action.payload };
//         case REMOVE_ITEM_CART_REQUEST:
//         case UPDATE_ITEM_CART_REQUEST:
//             return { ...state, loading: true };
//         case REMOVE_ITEM_CART_SUCCESS:
//             return {
//                 ...state,
//                 deleteCartItem: action.payload,
//                 loading: false,
//             };
//         case UPDATE_ITEM_CART_SUCCESS:
//             return {
//                 ...state,
//                 updateCartItem: action.payload,
//                 loading: false,
//             };
//         case REMOVE_ITEM_CART_FAILURE:
//         case UPDATE_ITEM_CART_FAILURE:
//             return {
//                 ...state,
//                 error: action.payload,
//                 loading: false,
//             };
//         default:
//             return state;
//     }
// };

export const {
    updateCartItemSuccess,
    removeCartItemSuccess,
    removeCartItemFailure,
    removeCartItemRequest,
    getCartFailure,
    getCartSuccess,
    addItemToCartFailure,
    getCartRequest,
    addItemToCartRequest,
    addItemToCartSuccess,
    updateCartItemFailure,
    updateCartItemRequest,
} = cartSlice.actions;

export const { actions, reducer } = cartSlice;
