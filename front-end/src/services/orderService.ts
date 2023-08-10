/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "react";
import { api } from "../configs/config";
import { AnyAction } from "redux";
import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    GET_ORDER_HISTORY_REQUEST,
    GET_ORDER_HISTORY_SUCCESS,
    GET_ORDER_HISTORY_FAILURE,
} from "../redux/order/ActionType";

export const createOrder =
    (reqData: any) => async (dispatch: Dispatch<AnyAction>) => {
        try {
            dispatch({ type: CREATE_ORDER_REQUEST });

            const { data } = await api.post(`/api/orders`, reqData.address);
            if (data.id) {
                reqData.navigate({ search: `step=3&order_id=${data.id}` });
                dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
            }
        } catch (err: any) {
            dispatch({
                type: CREATE_ORDER_FAILURE,
                payload:
                    err.response && err.response.data.message
                        ? err.response.data.message
                        : err.response,
            });
        }
    };

export const getOrderById =
    (orderId: number) => async (dispatch: Dispatch<AnyAction>) => {
        dispatch({ type: GET_ORDER_BY_ID_REQUEST });
        try {
            const { data } = await api.get(`api/orders/${orderId}`);

            dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
        } catch (err: any) {
            dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: err.message });
        }
    };

export const getOrderHistory = () => async (dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch({ type: GET_ORDER_HISTORY_REQUEST });
        const { data } = await api.get(`/api/orders/user`);
        dispatch({ type: GET_ORDER_HISTORY_SUCCESS, payload: data });
    } catch (err: any) {
        dispatch({ type: GET_ORDER_HISTORY_FAILURE, payload: err.message });
    }
};