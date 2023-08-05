/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction, Dispatch } from "redux";
import toast from "react-hot-toast";

import { API_BASE_URL } from "../configs/config";
import {
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
} from "../redux/ActionType";
import LoginType from "../types/LoginType";
import AuthType from "../types/RegisterType";
import axios from "axios";

// Register

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user: AuthType) => ({
    type: REGISTER_SUCCESS,
    payload: user,
});
const registerFailure = (error: string) => ({
    type: REGISTER_FAILURE,
    payload: error,
});

export const register = (userData: AuthType) => async (dispatch: Dispatch) => {
    dispatch(registerRequest());
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        const user = res.data;
        if (user.jwt) {
            localStorage.setItem("token", user.jwt);
        }
        dispatch(registerSuccess(user));
        await toast.success("Register successful!", {
            position: "top-right",
            duration: 3000,
            icon: "👏",
            className: "text-purple-500",
        });
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            toast.error("Register fail!");
            dispatch(registerFailure(error.response.data.message));
        } else {
            dispatch(registerFailure("An error occurred while register in."));
        }
    }
};

// Login

const loginRequest = (): AnyAction => ({ type: LOGIN_REQUEST });
const loginSuccess = (user: AuthType): AnyAction => ({
    type: LOGIN_SUCCESS,
    payload: user,
});
const loginFailure = (error: string): AnyAction => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const login =
    (userData: LoginType) => async (dispatch: Dispatch<AnyAction>) => {
        dispatch(loginRequest());
        try {
            const res = await axios.post(
                `${API_BASE_URL}/auth/signin`,
                userData
            );
            const user = res.data;
            if (user.jwt) {
                localStorage.setItem("token", user.jwt);
            }
            toast.success("Login successful!", {
                position: "top-right",
                duration: 3000,
                icon: "👏",
                className: "text-purple-500 z-[9999]",
            });
            dispatch(loginSuccess(user));
        } catch (error: any) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                toast.error("Login fail!");

                dispatch(loginFailure(error.response.data.message));
            } else {
                dispatch(loginFailure("An error occurred while logging in."));
            }
        }
    };

// Get user profile
const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user: AuthType) => ({
    type: GET_USER_SUCCESS,
    payload: user,
});
const getUserFailure = (error: string) => ({
    type: GET_USER_FAILURE,
    payload: error,
});

export const getUserProfile = (token: string) => async (dispatch: Dispatch) => {
    dispatch(getUserRequest());
    try {
        const res = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const user = res.data;
        dispatch(getUserSuccess(user));
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            dispatch(getUserFailure(error.response.data.message));
        } else {
            dispatch(getUserFailure("An error occurred while logging in."));
        }
    }
};

export const logout = () => (dispatch: Dispatch) => {
    dispatch({ type: "LOGOUT", payload: null });
    localStorage.clear();
};
