import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./authReducer";

const rootReducers = combineReducers({
    auth: authReducer,
});

export const authStore = legacy_createStore(
    rootReducers,
    applyMiddleware(thunk)
);
