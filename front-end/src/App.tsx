import { Route, Routes } from "react-router-dom";

import HomePage from "./customer/pages/HomePage";
import CustomerLayout from "./layouts/CustomerLayout";
import Products from "./customer/pages/Products";
import ProductDetail from "./customer/pages/ProductDetail";
import Cart from "./customer/pages/Cart";
import Checkout from "./customer/pages/Checkout";
import Order from "./customer/pages/Order";
import OrderDetails from "./customer/pages/OrderDetails";
import Login from "./customer/pages/Login";
import AdminLogin from "./admin/pages/Login";
import Register from "./customer/pages/Register";
import Account from "./customer/pages/Account";
import AdminLayout from "./layouts/AdminLayout";

import ProductManagement from "./admin/pages/ProductManagement";
import AccountManagement from "./admin/pages/AccountManagement";
import Dashboard from "./admin/pages/Dashboard";

function App() {
    return (
        <Routes>
            <Route path="/">
                <Route path="signin" element={<Login />}></Route>
                <Route path="signup" element={<Register />}></Route>
                <Route></Route>
            </Route>
            <Route path="" element={<CustomerLayout />}>
                <Route index element={<HomePage />} />
                <Route path="products" element={<Products />} />
                <Route
                    path="/:labelOne/:labelTwo/:labelThree"
                    element={<Products />}
                />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="order" element={<Order />} />
                <Route path="order/:id" element={<OrderDetails />} />
                <Route path="account" element={<Account />} />
            </Route>
            <Route path="admin">
                <Route path="signin" element={<AdminLogin />}></Route>
                <Route element={<AdminLayout />}>
                    <Route index element={<Dashboard />}></Route>
                    <Route
                        path="products"
                        element={<ProductManagement />}
                    ></Route>
                    <Route
                        path="accounts"
                        element={<AccountManagement />}
                    ></Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
