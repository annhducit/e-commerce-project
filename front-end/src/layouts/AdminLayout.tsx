import Sidebar from "../admin/components/Sidebar";
import Header from "../admin/components/Header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex flex-col">
            <div className="flex items-start">
                <Sidebar />
                <div className="relative flex flex-col w-full">
                    <Header />
                    <div className="flex-grow h-screen px-8 pt-24 bg-[#f6f6f6]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
