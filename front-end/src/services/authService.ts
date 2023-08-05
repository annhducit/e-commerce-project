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

export const register = (userData: AuthType) => async (dispatch) => {
    dispatch(registerRequest());
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        const user = res.data;
        if (user.jwt) {
            localStorage.setItem("token", user.jwt);
        }
        dispatch(registerSuccess(user));
    } catch (error) {
        dispatch(registerFailure(error?.message));
    }
};

// Login
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user: AuthType) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});
const loginFailure = (error: string) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const login = (userData: LoginType) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
        const user = res.data;
        if (user.jwt) {
            localStorage.setItem("token", user.jwt);
        }
        dispatch(loginSuccess(user));
    } catch (error) {
        dispatch(loginFailure(error?.message));
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

export const getUserProfile = (token: string) => async (dispatch) => {
    dispatch(getUserRequest());
    try {
        const res = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const user = res.data;
        dispatch(getUserSuccess(user));
    } catch (error) {
        dispatch(getUserFailure(error?.message));
    }
};

export const logout = () => (dispatch) => {
    dispatch({ type: "LOGOUT", payload: null });
    localStorage.clear();
};
