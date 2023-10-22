import Sidebar from "../admin/components/Sidebar";
import Header from "../admin/components/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const AdminLayout = () => {
    const [isOpenSide, setOpenSidebar] = useState<boolean>();
    const [titleHeading, setTitleHeading] = useState<string>();

    return (
        <div className="flex flex-col">
            <div className="flex items-start">
                <Sidebar visible={isOpenSide} titleHeading={setTitleHeading} />
                <div className="relative flex flex-col w-full">
                    <Header
                        controlSidebar={setOpenSidebar}
                        visible={isOpenSide}
                        title={titleHeading}
                    />
                    <div className="flex-grow h-screen overflow-y-scroll px-8 pt-24 bg-[#f6f6f6]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
