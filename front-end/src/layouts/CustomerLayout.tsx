import Navigation from "../customer/components/Navigation";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const CustomerLayout = () => {
    return (
        <div>
            <Navigation />
            <Outlet />
            <Footer />
        </div>
    );
};

export default CustomerLayout;
