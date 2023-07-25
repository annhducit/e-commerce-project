import { Route, Routes } from "react-router-dom";
import HomePage from "./customer/pages/HomePage";
import CustomerLayout from "./layouts/CustomerLayout";
import Products from "./customer/pages/Products";
import ProductDetail from "./customer/pages/ProductDetail";
import Cart from "./customer/pages/Cart";
import Checkout from "./customer/pages/Checkout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<CustomerLayout />}>
                <Route index element={<HomePage />} />
                <Route path="products" element={<Products />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
            </Route>
        </Routes>
    );
}

export default App;
