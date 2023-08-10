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
} from "./ActionType";

const initials = Object.freeze({
    cart: null,
    isLoading: false,
    error: null,
    cartItems: [],
});

type CartAction = {
    type:
        | typeof GET_CART_REQUEST
        | typeof GET_CART_SUCCESS
        | typeof GET_CART_FAILURE
        | typeof ADD_ITEM_TO_CART_REQUEST
        | typeof ADD_ITEM_TO_CART_SUCCESS
        | typeof ADD_ITEM_TO_CART_FAILURE
        | typeof UPDATE_ITEM_CART_REQUEST
        | typeof UPDATE_ITEM_CART_SUCCESS
        | typeof UPDATE_ITEM_CART_FAILURE
        | typeof REMOVE_ITEM_CART_REQUEST
        | typeof REMOVE_ITEM_CART_SUCCESS
        | typeof REMOVE_ITEM_CART_FAILURE;

    payload?: unknown;
};

export const cartReducer = (state = initials, action: CartAction) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART_REQUEST:
            return { ...state, loading: true, error: null };

        case ADD_ITEM_TO_CART_SUCCESS:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload?.cartItems],
                loading: false,
            };

        case ADD_ITEM_TO_CART_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case GET_CART_REQUEST:
            return { ...state, loading: true };

        case GET_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: action.payload?.cartItems,
                cart: action.payload,
            };

        case GET_CART_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case REMOVE_ITEM_CART_REQUEST:
        case UPDATE_ITEM_CART_REQUEST:
            return { ...state, loading: true };
        case REMOVE_ITEM_CART_SUCCESS:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item.id !== action.payload
                ),
                loading: false,
            };
        case UPDATE_ITEM_CART_SUCCESS:
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
                loading: false,
            };
        case REMOVE_ITEM_CART_FAILURE:
        case UPDATE_ITEM_CART_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};
