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
