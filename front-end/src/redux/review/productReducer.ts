import {
    CREATE_REVIEW_PRODUCT_REQUEST,
    CREATE_REVIEW_PRODUCT_SUCCESS,
    CREATE_REVIEW_PRODUCT_FAILURE,
    DELETE_REVIEW_PRODUCT_REQUEST,
    DELETE_REVIEW_PRODUCT_SUCCESS,
    DELETE_REVIEW_PRODUCT_FAILURE,
} from "./ActionType";

type ProductAction = {
    type:
        | typeof CREATE_REVIEW_PRODUCT_REQUEST
        | typeof CREATE_REVIEW_PRODUCT_SUCCESS
        | typeof CREATE_REVIEW_PRODUCT_FAILURE
        | typeof DELETE_REVIEW_PRODUCT_REQUEST
        | typeof DELETE_REVIEW_PRODUCT_SUCCESS
        | typeof DELETE_REVIEW_PRODUCT_FAILURE;

    payload?: unknown;
};

const initials = Object.freeze({
    isLoading: false,
    error: null,
});

export const productCustomerReducer = (
    state = initials,
    action: ProductAction
) => {
    switch (action.type) {
        default:
            return state;
    }
};
