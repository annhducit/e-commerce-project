import Sidebar from "../admin/components/Sidebar";
import Header from "../admin/components/Header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                <Sidebar />
                <Header />
                <div className="h-screen p-10 grow">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
