import Navigation from "../customer/components/Navigation";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const CustomerLayout = () => {
    return (
        <div className="flex flex-col">
            <Navigation />
            <div className="">
                {" "}
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default CustomerLayout;
