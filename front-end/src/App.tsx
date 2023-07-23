import { Route, Routes } from "react-router-dom";
import HomePage from "./customer/pages/HomePage";
import CustomerLayout from "./layouts/CustomerLayout";
import Products from "./customer/pages/Products";

function App() {
    return (
        <Routes>
            <Route path="/" element={<CustomerLayout />}>
                <Route index element={<HomePage />} />
                <Route path="products" element={<Products />} />
            </Route>
        </Routes>
    );
}

export default App;
