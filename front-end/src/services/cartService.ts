/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const getCart = () => async (dispatch: Dispatch<AnyAction>) => {
    dispatch({ type: GET_CART_REQUEST });
    try {
        const { data } = await api.get("/api/carts");
        dispatch({ type: GET_CART_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: GET_CART_FAILURE, payload: err });
    }
};

export const addItemToCart =
    (item: any) => async (dispatch: Dispatch<AnyAction>) => {
        dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
        try {
            const { data } = await api.put("/api/carts/add", item.data);
            dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
        } catch (err) {
            dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: err });
        }
    };

export const removeItemToCart =
    (item: any) => async (dispatch: Dispatch<AnyAction>) => {
        dispatch({ type: REMOVE_ITEM_CART_REQUEST });
        try {
            const { data } = await api.delete(`/api/cart_items/${item.id}`);
            dispatch({ type: REMOVE_ITEM_CART_SUCCESS, payload: data });
        } catch (err) {
            dispatch({ type: REMOVE_ITEM_CART_FAILURE, payload: err });
        }
    };

export const updateItemToCart =
    (item: any) => async (dispatch: Dispatch<AnyAction>) => {
        dispatch({ type: UPDATE_ITEM_CART_REQUEST });
        try {
            const { data } = await api.put(
                `/api/cart_items/${item.id}`,
                item.data
            );
            dispatch({ type: UPDATE_ITEM_CART_SUCCESS, payload: data });
        } catch (err) {
            dispatch({ type: UPDATE_ITEM_CART_FAILURE, payload: err });
        }
    };
