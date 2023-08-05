import {
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
} from "./ActionType";

type AuthAction = {
    type:
        | typeof REGISTER_REQUEST
        | typeof LOGIN_REQUEST
        | typeof GET_USER_REQUEST
        | typeof REGISTER_SUCCESS
        | typeof LOGIN_SUCCESS
        | typeof GET_USER_SUCCESS
        | typeof REGISTER_FAILURE
        | typeof LOGIN_FAILURE
        | typeof GET_USER_FAILURE
        | typeof LOGOUT;
    payload?: unknown;
};

const initials = Object.freeze({
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
});

export const authReducer = (state = initials, action: AuthAction) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return { ...state, isLoading: true, error: null };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                jwt: action.payload,
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                user: action.payload,
            };
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        case LOGOUT:
            return { ...initials };
        default:
            return state;
    }
};
