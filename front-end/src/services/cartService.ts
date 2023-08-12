/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { AnyAction, Dispatch } from "redux";
import {
    ADD_ITEM_TO_CART_FAILURE,
    ADD_ITEM_TO_CART_REQUEST,
    ADD_ITEM_TO_CART_SUCCESS,
    GET_CART_FAILURE,
    GET_CART_REQUEST,
    GET_CART_SUCCESS,
    REMOVE_ITEM_CART_FAILURE,
    REMOVE_ITEM_CART_REQUEST,
    REMOVE_ITEM_CART_SUCCESS,
    UPDATE_ITEM_CART_FAILURE,
    UPDATE_ITEM_CART_REQUEST,
    UPDATE_ITEM_CART_SUCCESS,
} from "../redux/cart/ActionType";
import { api } from "../configs/config";

export const getCart =
    () =>
    async (dispatch: Dispatch<AnyAction>): Promise<void> => {
        dispatch({ type: GET_CART_REQUEST });
        try {
            const { data } = await api.get("/api/carts");
            dispatch({ type: GET_CART_SUCCESS, payload: data });
        } catch (err) {
            dispatch({ type: GET_CART_FAILURE, payload: err });
        }
    };

export const addItemToCart =
    (reqData: any) =>
    async (dispatch: Dispatch<AnyAction>): Promise<void> => {
        dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
        try {
            const data = await api.post("/api/carts/add", reqData);
            dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
            console.log("add cart success");
            toast.success("Add item to cart sucessfully");
        } catch (err) {
            dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: err });
            toast.error("Add item to cart fail!");
        }
    };

export const removeItemToCart =
    (cartItemId: number) =>
    async (dispatch: Dispatch<AnyAction>): Promise<void> => {
        dispatch({ type: REMOVE_ITEM_CART_REQUEST });
        try {
            await api.delete(`/api/cart_items/${cartItemId}`);
            dispatch({ type: REMOVE_ITEM_CART_SUCCESS, payload: cartItemId });
            console.log("remove successfull");
            toast.success("Remove item cart sucessfully!");
        } catch (err) {
            dispatch({ type: REMOVE_ITEM_CART_FAILURE, payload: err });
            toast.error("Remove item cart fail!");
        }
    };

export const updateItemToCart =
    (item: any, id: number) =>
    async (dispatch: Dispatch<AnyAction>): Promise<void> => {
        dispatch({ type: UPDATE_ITEM_CART_REQUEST });
        try {
            const { data } = await api.put(`/api/cart_items/${id}`, item);
            dispatch({ type: UPDATE_ITEM_CART_SUCCESS, payload: data });
        } catch (err) {
            dispatch({ type: UPDATE_ITEM_CART_FAILURE, payload: err });
        }
    };
