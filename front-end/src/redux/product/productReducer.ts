import ProductType from "../../types/ProductType";
import {
    FIND_PRODUCTS_REQUEST,
    FIND_PRODUCTS_SUCCESS,
    FIND_PRODUCTS_FAILURE,
    FIND_PRODUCT_BY_ID_FAILURE,
    FIND_PRODUCT_BY_ID_REQUEST,
    FIND_PRODUCT_BY_ID_SUCCESS,
} from "./ActionType";

type ProductAction = {
    type:
        | typeof FIND_PRODUCTS_SUCCESS
        | typeof FIND_PRODUCTS_REQUEST
        | typeof FIND_PRODUCTS_FAILURE
        | typeof FIND_PRODUCT_BY_ID_FAILURE
        | typeof FIND_PRODUCT_BY_ID_REQUEST
        | typeof FIND_PRODUCT_BY_ID_SUCCESS;

    payload?: unknown;
};

const initials = Object.freeze({
    products: [] as ProductType[],
    product: null,
    isLoading: false,
    error: null,
});

export const productCustomerReducer = (
    state = initials,
    action: ProductAction
) => {
    switch (action.type) {
        case FIND_PRODUCTS_FAILURE:
        case FIND_PRODUCT_BY_ID_REQUEST:
            return { ...state, loading: true, error: null };
        case FIND_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                products: action.payload,
            };
        case FIND_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                product: action.payload,
            };
        case FIND_PRODUCT_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
