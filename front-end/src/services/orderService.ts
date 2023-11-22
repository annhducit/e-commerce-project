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
import { OrderStatus } from "../types/OrderType";

export const createOrder =
    (reqData: any) => async (dispatch: Dispatch<AnyAction>) => {
        try {
            dispatch({ type: CREATE_ORDER_REQUEST });

            const { data } = await api.post(`/api/orders`, reqData.address);
            if (data.id) {
                reqData.navigate({ search: `step=4&order_id=${data.id}` });
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
    (orderId: number | string) => async (dispatch: Dispatch<AnyAction>) => {
        dispatch({ type: GET_ORDER_BY_ID_REQUEST });
        try {
            const { data } = await api.get(`api/orders/${orderId}`);

            dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
        } catch (err: any) {
            dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: err.message });
        }
    };

export const getOrderHistoryRedux =
    () => async (dispatch: Dispatch<AnyAction>) => {
        try {
            dispatch({ type: GET_ORDER_HISTORY_REQUEST });
            const { data } = await api.get(`/api/orders/user`);
            dispatch({ type: GET_ORDER_HISTORY_SUCCESS, payload: data });
        } catch (err: any) {
            dispatch({ type: GET_ORDER_HISTORY_FAILURE, payload: err.message });
        }
    };

export const getAllOrders = async () => {
    const data = await api.get(`/api/orders`);
    return data.data;
};

export const getorderByIdAdmin = async (id: number | string) => {
    const data = await api.get(`/api/orders/${id}`);
    return data.data;
};

export const getOrderHistoryByAuth = async () => {
    const data = await api.get(`/api/orders/user`);
    return data.data;
};

export const getOrderByStatus = async (status: OrderStatus) => {
    const params = new URLSearchParams();
    params.append("status", status);
    const data = await api.get(`/api/orders/status?${params.toString()}`);
    return data.data;
};

export const searchOrderByKeyword = async (keyword: string) => {
    const params = new URLSearchParams();
    params.append("keyword", keyword);
    const data = await api.get(`/api/orders/search?${params.toString()}`);
    return data.data;
};

export const updateOrderStatus = async (
    id: string | undefined,
    type: OrderStatus
) => {
    await api.put(`/api/admin/orders/${id}/${type}`);
};

export const filterOrderByDateCreate = async (
    startDate: string | undefined,
    endDate: string | undefined
) => {
    try {
        const params = new URLSearchParams();
        startDate && params.append("startDate", startDate);
        endDate && params.append("endDate", endDate);
        const data = await api.get(
            `/api/orders/dateCreate?${params.toString()}`
        );
        return data.data;
    } catch (err) {
        console.log(err);
    }
};
