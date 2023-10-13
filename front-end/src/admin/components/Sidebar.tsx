import { NavLink } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";
import logo from "../../assets/images/logo.png";

interface ItemSideBar {
    icon: React.ReactElement;
    title: string;
    to: string;
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

function MenuItem({ icon, title, to }: ItemSideBar): JSX.Element {
    return (
        <NavLink
            to={to}
            className={(nav) =>
                `flex items-center transition-all   px-5 py-3 gap-3 rounded-lg mt-3 ${
                    nav.isActive ? "bg-[#ff7506] text-white" : ""
                }`
            }
        >
            {icon}
            <span className="ml-2 text-md font-nomal">{title}</span>
        </NavLink>
    );
}

function Sidebar() {
    return (
        <aside className="w-[320px] h-screen pt-4  px-4 bg-white transition-all">
            <div className="w-full h-24 rounded">
                <img
                    src={logo}
                    alt=""
                    className="object-cover w-full h-full rounded"
                />
            </div>
            <MenuSidebar>
                <MenuItem
                    to="/"
                    title="Dashboard"
                    icon={<FaBriefcase />}
                ></MenuItem>
                <MenuItem
                    to="/admin/products"
                    title="Products"
                    icon={<FaBriefcase />}
                ></MenuItem>
                <MenuItem
                    to="/admin/orders"
                    title="Orders"
                    icon={<FaBriefcase />}
                ></MenuItem>
                <MenuItem
                    to="/admin/accounts"
                    title="Account"
                    icon={<FaBriefcase />}
                ></MenuItem>
            </MenuSidebar>
        </aside>
    );
}

export default Sidebar;
