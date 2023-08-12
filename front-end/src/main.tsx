import React from "react";
import { ToastContainer } from "react-toastify";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { globalStore } from "./redux/globalStore.ts";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={globalStore}>
                {" "}
                <App />
                <ToastContainer />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
