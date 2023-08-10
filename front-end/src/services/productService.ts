import { Dispatch } from "react";
import { api } from "../configs/config";
import {
    FIND_PRODUCTS_FAILURE,
    FIND_PRODUCTS_REQUEST,
    FIND_PRODUCTS_SUCCESS,
    FIND_PRODUCT_BY_ID_FAILURE,
    FIND_PRODUCT_BY_ID_REQUEST,
    FIND_PRODUCT_BY_ID_SUCCESS,
} from "../redux/product/ActionType";
import { AnyAction } from "redux";
import { FilterType } from "../customer/pages/Products";
import { MenClothes } from "../types/MenClothes";

export const findProducts =
    (products: FilterType) => async (dispatch: Dispatch<AnyAction>) => {
        dispatch({ type: FIND_PRODUCTS_REQUEST });
        const {
            colors,
            sizes,
            minPrice,
            maxPrice,
            minDiscount,
            category,
            stock,
            sort,
            pageNumber,
            pageSize,
        } = products;
        try {
            const { data } = await api.get(
                `/api/products?colors=${colors}&sizes=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
            );
            console.log(data);
            dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
        } catch (err) {
            dispatch({ type: FIND_PRODUCTS_FAILURE, payload: err });
        }
    };

export const findProductById =
    (data: MenClothes) => async (dispatch: Dispatch<AnyAction>) => {
        dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
        const { id } = data;
        try {
            const { data: productData } = await api.get(`/api/products/${id}`);
            dispatch({
                type: FIND_PRODUCT_BY_ID_SUCCESS,
                payload: productData,
            });
        } catch (err) {
            dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: err });
        }
    };