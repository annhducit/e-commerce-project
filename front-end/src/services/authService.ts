/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";

import { API_BASE_URL } from "../configs/config";

import LoginType from "../types/LoginType";
import AuthType from "../types/RegisterType";
import axios from "axios";
import {
    getUserFailure,
    getUserRequest,
    getUserSuccess,
    loginFailure,
    logout,
    loginRequest,
    loginSuccess,
    registerFailure,
    registerRequest,
    registerSuccess,
} from "../redux/auth/authSlice";
import { AppDispatch } from "../redux/globalStore";

// Register
export const register =
    (userData: AuthType) => async (dispatch: AppDispatch) => {
        dispatch(registerRequest());
        try {
            const res = await axios.post(
                `${API_BASE_URL}/auth/signup`,
                userData
            );
            const user = res.data;
            if (user.jwt) {
                localStorage.setItem("token", user.jwt);
            }
            dispatch(registerSuccess(user));
            toast.success("Register successful!", {
                icon: "👏",
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
                dispatch(
                    registerFailure("An error occurred while register in.")
                );
            }
        }
    };

// Login
export const login = (userData: LoginType) => async (dispatch: AppDispatch) => {
    dispatch(loginRequest());
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
        const user = res.data;
        if (user.jwt) {
            localStorage.setItem("token", user.jwt);
        }
        toast.success("Login successful!", {
            icon: "👏",
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
export const getUserProfile =
    (token: string) => async (dispatch: AppDispatch) => {
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

export const logoutAccount = () => (dispatch: AppDispatch) => {
    dispatch(logout());
    localStorage.clear();
};
