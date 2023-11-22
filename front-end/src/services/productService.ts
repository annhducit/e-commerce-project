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
            dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
        } catch (err) {
            dispatch({ type: FIND_PRODUCTS_FAILURE, payload: err });
        }
    };

export const findProductById =
    (id: string | undefined) => async (dispatch: Dispatch<AnyAction>) => {
        dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
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

export const searchProductByKeyword = async (keyword: string) => {
    try {
        const params = new URLSearchParams();
        keyword && params.append("keyword", keyword);
        const data = await api.get(`/api/products/search?${params.toString()}`);
        return data.data;
    } catch (err) {
        console.log(err);
    }
};

export const getProductsByCategory = async (type: string) => {
    try {
        const data = await api.get(
            `/api/products/category?category=${type.toString()}`
        );
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getAllProducts = async () => {
    try {
        const data = await api.get(`/api/products/all`);
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getProductById = async (id: number | string) => {
    try {
        const data = await api.get(`/api/products/${id}`);
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const sortByDiscountedPrice = async (type: string) => {
    try {
        const params = new URLSearchParams();
        type && params.append("sortBy", type);
        const data = await api.get(
            `/api/products/sortByPrice?${params.toString()}`
        );
        return data.data;
    } catch (err) {
        console.log(err);
    }
};

export const filterByDateCreate = async (
    startDate: string,
    endDate: string
) => {
    try {
        const params = new URLSearchParams();
        startDate && params.append("startDate", startDate);
        endDate && params.append("endDate", endDate);
        const data = await api.get(
            `/api/products/dateCreate?${params.toString()}`
        );
        return data.data;
    } catch (err) {
        console.log(err);
    }
};

export const sortByDiscountedPriceAndCategory = async (
    type: string,
    category: string
) => {
    try {
        const params = new URLSearchParams();
        type && params.append("sortBy", type);
        category && params.append("category", category);
        const data = await api.get(
            `/api/products/sortByPriceAndCategory?${params.toString()}`
        );
        return data.data;
    } catch (err) {
        console.log(err);
    }
};

export const createProduct = async (data: string) => {
    await api.post("/api/products", data);
};

export const updateProduct = async (id: string, data: string) => {
    await api.put(`/api/products/${id}`, data);
};

export const deleteProductById = async (id: number | undefined) => {
    await api.delete(`/api/products/${id}`);
};
