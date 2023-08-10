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
} from "./ActionType";

type OrderAction = {
    type:
        | typeof CREATE_ORDER_FAILURE
        | typeof CREATE_ORDER_REQUEST
        | typeof CREATE_ORDER_SUCCESS
        | typeof GET_ORDER_BY_ID_FAILURE
        | typeof GET_ORDER_BY_ID_REQUEST
        | typeof GET_ORDER_BY_ID_SUCCESS
        | typeof GET_ORDER_HISTORY_REQUEST
        | typeof GET_ORDER_HISTORY_SUCCESS
        | typeof GET_ORDER_HISTORY_FAILURE;

    payload?: unknown;
};

const initials = Object.freeze({
    orders: [],
    order: null,
    isLoading: false,
    error: null,
});

export const orderReducer = (state = initials, action: OrderAction) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return { ...state, loading: true, error: null };
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                order: action.payload,
                error: null,
            };
        case CREATE_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case GET_ORDER_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_ORDER_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
                error: null,
            };
        case GET_ORDER_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case GET_ORDER_HISTORY_REQUEST:
            return { loading: true, orders: [] };
        case GET_ORDER_HISTORY_SUCCESS:
            return { loading: false, orders: action.payload };
        case GET_ORDER_HISTORY_FAILURE:
            return { loading: false, error: action.payload, order: [] };
        default:
            return state;
    }
};
