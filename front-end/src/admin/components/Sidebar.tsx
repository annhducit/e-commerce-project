import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import orderImage from "../../assets/icons/order.png";
import dashboardImage from "../../assets/icons/dashboard.png";
import account from "../../assets/icons/customers.png";
import logout from "../../assets/icons/logout.png";
import clothesImage from "../../assets/icons/clothes.png";

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
        <NavLink
            to={to}
            className={(nav) =>
                `flex items-center transition-all ${
                    type ? "px-5" : "px-3"
                } py-3 gap-3 rounded-lg mt-3 ${
                    nav.isActive
                        ? "bg-[#ff7506] text-white"
                        : "hover:bg-slate-100"
                }`
            }
            onClick={onClick}
        >
            {icon}
            <div className={`${type ? "h-6 w-6" : "h-7 w-7"}`}>
                <img src={iconImage} alt="" className="w-full h-full" />
            </div>
            {type && <span className="ml-2 text-md font-nomal">{title}</span>}
        </NavLink>
    );
}

function Sidebar({
    visible,
    titleHeading,
}: {
    visible: boolean | undefined;
    titleHeading: (title: string) => void;
}) {
    return (
        <>
            <aside
                className={`${
                    visible ? "w-[320px]" : "w-[90px]"
                } h-screen pt-4 px-4 bg-white transition-all ease-in-out duration-500`}
            >
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
                        to="/admin/accounts"
                        title="Đăng xuất"
                        iconImage={logout}
                        type={visible}
                    ></MenuItem>
                </MenuSidebar>
            </aside>
        </>
    );
}

export default Sidebar;
