/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { AnyAction, Dispatch } from "redux";

import { api } from "../configs/config";
import {
    addItemToCartFailure,
    addItemToCartRequest,
    addItemToCartSuccess,
    getCartFailure,
    getCartRequest,
    getCartSuccess,
    removeCartItemFailure,
    removeCartItemRequest,
    removeCartItemSuccess,
    updateCartItemFailure,
    updateCartItemRequest,
    updateCartItemSuccess,
} from "../redux/cart/cartReducer";

export const getCart =
    () =>
    async (dispatch: Dispatch<AnyAction>): Promise<void> => {
        dispatch(getCartRequest());
        try {
            const { data } = await api.get("/api/carts");
            dispatch(getCartSuccess(data));
        } catch (err) {
            dispatch(getCartFailure());
        }
    };

export const addItemToCart =
    (reqData: any) =>
    async (dispatch: Dispatch<AnyAction>): Promise<void> => {
        dispatch(addItemToCartRequest());
        try {
            const data = await api.post("/api/carts/add", reqData);
            dispatch(addItemToCartSuccess(data));
            toast.success("Add item to cart sucessfully");
        } catch (err) {
            toast.error("Item is already existed!");
            dispatch(addItemToCartFailure());
        }
    };

export const removeItemToCart =
    (cartItemId: number) =>
    async (dispatch: Dispatch<AnyAction>): Promise<void> => {
        dispatch(removeCartItemRequest());
        try {
            await api.delete(`/api/cart_items/${cartItemId}`);
            dispatch(removeCartItemSuccess(cartItemId));
            toast.success("Remove item cart sucessfully!");
        } catch (err) {
            dispatch(removeCartItemFailure());
            toast.error("Remove item cart fail!");
        }
    };

export const updateItemToCart =
    (item: any, id: number) =>
    async (dispatch: Dispatch<AnyAction>): Promise<void> => {
        dispatch(updateCartItemRequest());
        try {
            const { data } = await api.put(`/api/cart_items/${id}`, item);
            dispatch(updateCartItemSuccess(data));
        } catch (err) {
            dispatch(updateCartItemFailure());
        }
    };
