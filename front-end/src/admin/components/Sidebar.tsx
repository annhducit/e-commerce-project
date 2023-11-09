import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import orderImage from "../../assets/icons/order.png";
import setting from "../../assets/icons/setting.png";
import dashboardImage from "../../assets/icons/dashboard.png";
import account from "../../assets/icons/customers.png";
import logout from "../../assets/icons/logout.png";
import clothesImage from "../../assets/icons/clothes.png";
import adminImage from "../../assets/images/admin.png";
import { logoutAccount } from "../../services/authService";
import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import ModalAdvance from "../../components/portal/ModalAdvance";
import { useState } from "react";
import { Space, Tag } from "antd";
import { FaSignOutAlt } from "react-icons/fa";

interface ItemSideBar {
    icon?: React.ReactElement;
    iconImage: string;
    title: string;
    to: string;
    type: boolean | undefined;
    onClick?: () => void;
}

type MenuSideBarProps = {
    children: React.ReactNode;
} & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

function MenuSidebar({ children }: MenuSideBarProps): JSX.Element {
    return <div>{children}</div>;
}

function MenuItem({
    icon,
    iconImage,
    title,
    to,
    type,
    onClick,
}: ItemSideBar): JSX.Element {
    return (
        <div className="flex items-center">
            <NavLink
                to={to}
                className={(nav) =>
                    `flex items-center flex-1 transition-all ${
                        type ? "px-5" : "px-5"
                    } py-3 gap-3 mt-3 ${
                        nav.isActive
                            ? "bg-gray-200 text-black"
                            : "hover:bg-slate-100"
                    }`
                }
                onClick={onClick}
            >
                {icon}
                <div className={`${type ? "h-6 w-6" : "h-7 w-7"}`}>
                    <img src={iconImage} alt="" className="w-full h-full" />
                </div>
                {type && (
                    <span className="ml-2 text-md font-nomal">{title}</span>
                )}
            </NavLink>
            <NavLink
                to={to}
                className={(nav) =>
                    `mt-3 transition-all ${
                        nav.isActive
                            ? "h-[48px] w-1 bg-[#ff7506]"
                            : "hover:bg-slate-100"
                    }`
                }
            ></NavLink>
        </div>
    );
}

function Sidebar({
    visible,
    titleHeading,
}: {
    visible: boolean | undefined;
    titleHeading: (title: string) => void;
}) {
    const [openModalLogout, setOpenModalLogout] = useState<boolean>(false);
    const dispatch = useDispatch();
    const handleLogout = () => {
        setOpenModalLogout(false);
        dispatch(logoutAccount() as unknown as AnyAction);
    };
    return (
        <>
            <aside
                className={`${
                    visible ? "w-[320px]" : "w-[70px]"
                } h-screen pt-4 bg-white flex flex-col justify-between transition-all ease-in-out duration-500`}
            >
                <div>
                    <div className="w-full h-[100px] rounded mb-6">
                        <img
                            src={logo}
                            alt=""
                            className="object-cover w-full h-full rounded"
                        />
                    </div>

                    <MenuSidebar>
                        <MenuItem
                            to="/admin/dashboard"
                            title="Dashboard"
                            iconImage={dashboardImage}
                            type={visible}
                            onClick={() => titleHeading("Dashboard")}
                        ></MenuItem>
                        <MenuItem
                            to="/admin/products"
                            title="Sản phẩm"
                            iconImage={clothesImage}
                            type={visible}
                            onClick={() => titleHeading("Sản phẩm")}
                        ></MenuItem>
                        <MenuItem
                            to="/admin/orders"
                            title="Đơn hàng"
                            iconImage={orderImage}
                            type={visible}
                            onClick={() => titleHeading("Đơn hàng")}
                        ></MenuItem>
                        <MenuItem
                            to="/admin/customers"
                            title="Khách hàng"
                            iconImage={account}
                            type={visible}
                            onClick={() => titleHeading("Khách hàng")}
                        ></MenuItem>
                        <MenuItem
                            to="/admin/settings"
                            title="Cài đặt"
                            iconImage={setting}
                            type={visible}
                            onClick={() => setOpenModalLogout(true)}
                        ></MenuItem>
                    </MenuSidebar>
                </div>
                <div>
                    <div
                        className="w-full flex items-center px-5 gap-x-4 py-3 my-2 hover:bg-slate-200 p-4 cursor-pointer transition-all"
                        onClick={() => setOpenModalLogout(true)}
                    >
                        <div className={`${visible ? "h-6 w-6" : "h-7 w-7"}`}>
                            <img
                                src={logout}
                                alt=""
                                className="w-full h-full"
                            />
                        </div>
                        {visible && <p>Đăng xuất</p>}
                    </div>
                    <hr className="py-1" />
                    <div className="flex items-center gap-x-4 px-4 pb-4">
                        <div className="w-10 h-10 rounded-full">
                            <img
                                src={adminImage}
                                alt=""
                                className="w-full h-full rounded-full"
                            />
                        </div>
                        {visible && (
                            <div className="flex flex-col">
                                <span className="font-semibold">Anh Đức</span>
                                <span className="text-sm">
                                    trongduc20@gmail.com
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
            <ModalAdvance
                header="Đăng xuất"
                size="sm"
                props={{
                    visible: openModalLogout as boolean,
                    onClose: () => setOpenModalLogout(false),
                    children: undefined,
                    contentClassName: "bg-white",
                }}
                footer={
                    <Space className="gap-x-2">
                        <Tag
                            color="red-inverse"
                            onClick={handleLogout}
                            className="px-2 py-1 hover:cursor-pointer hover:bg-red-600"
                        >
                            Đăng xuất
                        </Tag>
                        <Tag
                            color="red"
                            onClick={() => setOpenModalLogout(false)}
                            className="px-2 py-1 hover:cursor-pointer hover:bg-red-200"
                        >
                            Huỷ bỏ
                        </Tag>
                    </Space>
                }
            >
                <div className="flex flex-col gap-y-1">
                    <h2>Bạn có chắc muốn đăng xuất tài khoản này</h2>
                    <div className="mx-auto">
                        <FaSignOutAlt className="text-6xl text-slate-500" />
                    </div>
                </div>
            </ModalAdvance>
        </>
    );
}

export default Sidebar;
