import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./auth/authReducer";
import { productCustomerReducer } from "./product/productReducer";
import { cartReducer } from "./cart/cartReducer";
import { orderReducer } from "./order/orderReducer";

const rootReducers = combineReducers({
    auth: authReducer,
    customerProduct: productCustomerReducer,
    cart: cartReducer,
    order: orderReducer,
});

export const globalStore = legacy_createStore(
    rootReducers,
    applyMiddleware(thunk)
);

export type RootState = ReturnType<typeof globalStore.getState>;
export type AppDispatch = typeof globalStore.dispatch;
