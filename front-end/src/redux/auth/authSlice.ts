import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserType = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nation: string;
};
export type AuthState = {
    user: UserType | null;
    isLoading: boolean;
    error: unknown | Error | null;
    jwt: unknown | null;
};

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        registerRequest(state) {
            state.isLoading = true;
            state.error = null;
        },
        loginRequest(state) {
            state.isLoading = true;
            state.error = null;
        },
        getUserRequest(state) {
            state.isLoading = true;
            state.error = null;
        },
        registerSuccess(state, action: PayloadAction<unknown>) {
            state.isLoading = false;
            state.error = null;
            state.jwt = action.payload;
        },
        loginSuccess(state, action: PayloadAction<unknown>) {
            state.isLoading = false;
            state.error = null;
            state.jwt = action.payload;
        },
        getUserSuccess(state, action: PayloadAction<unknown>) {
            state.isLoading = false;
            state.error = null;
            state.user = action.payload as UserType;
        },
        registerFailure(state, action: PayloadAction<unknown>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        loginFailure(state, action: PayloadAction<unknown>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        getUserFailure(state, action: PayloadAction<unknown>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout() {
            return initialState;
        },
    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    logout,
    registerFailure,
    registerSuccess,
    registerRequest,
    getUserFailure,
    getUserRequest,
    getUserSuccess,
} = authSlice.actions;

export const { actions, reducer } = authSlice;
