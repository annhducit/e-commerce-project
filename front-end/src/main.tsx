import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { authStore } from "./redux/authStore.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={authStore}>
                {" "}
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
