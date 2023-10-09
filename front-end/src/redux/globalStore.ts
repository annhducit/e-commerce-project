import thunk from "redux-thunk";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { reducer as authReducer } from "./auth/authSlice";
import { productCustomerReducer } from "./product/productReducer";
import { reducer as cartReducer } from "./cart/cartReducer";
import { orderReducer } from "./order/orderReducer";

const rootReducers = combineReducers({
    auth: authReducer,
    customerProduct: productCustomerReducer,
    cart: cartReducer,
    order: orderReducer,
});

export const globalStore = configureStore({
    reducer: rootReducers,
    middleware: [thunk],
});

export default globalStore;

export type RootState = ReturnType<typeof globalStore.getState>;
export type AppDispatch = typeof globalStore.dispatch;
