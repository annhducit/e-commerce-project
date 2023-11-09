import { FaArrowLeft, FaBars } from "react-icons/fa";

import adminImage from "../../assets/images/admin.png";

const Header = ({
    controlSidebar,
    visible,
    title,
}: {
    controlSidebar: (state: boolean) => void;
    visible: boolean | undefined;
    title: string | undefined;
}) => {
    return (
        <header className="absolute z-50 flex items-center w-full h-[70px] px-4 bg-white shadow lg:px-6 hover:shadow-lg">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-x-4 ">
                    <span
                        className="text-lg opacity-70 text-black rounded-lg  p-3 hover:bg-[#ff7506] hover:text-white hover:cursor-pointer"
                        onClick={() => controlSidebar(!visible)}
                    >
                        {visible ? <FaArrowLeft /> : <FaBars />}
                    </span>
                    <h1 className="text-lg font-bold text-black">{title}</h1>
                </div>
                <div className="flex items-center gap-x-2 lg:gap-x-4">
                    <p className="font-semibold text-slate-500 text-md opacity-80">
                        Anh Đức
                    </p>
                    <div className="w-8 h-8 rounded-full">
                        <img
                            src={adminImage}
                            alt=""
                            className="w-full h-full rounded-full"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header;
