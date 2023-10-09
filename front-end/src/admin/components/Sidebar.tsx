import { NavLink } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";

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
                `flex items-center hover:bg-slate-100 px-5 py-3 gap-3 rounded-lg mt-3 ${
                    nav.isActive ? "bg-slate-100" : ""
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
        <aside className="w-[350px] min-h-screen py-7 px-5 bg-slate-300 border-r-4 border-gray-400">
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
                    to="/admin/accounts"
                    title="Account"
                    icon={<FaBriefcase />}
                ></MenuItem>
            </MenuSidebar>
        </aside>
    );
}

export default Sidebar;
