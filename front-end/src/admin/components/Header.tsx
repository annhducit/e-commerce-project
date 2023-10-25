import { FaArrowLeft, FaBars } from "react-icons/fa";

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
                        className="text-xl text-black rounded-lg  p-3 hover:bg-[#ff7506] hover:text-white hover:cursor-pointer"
                        onClick={() => controlSidebar(!visible)}
                    >
                        {visible ? <FaArrowLeft /> : <FaBars />}
                    </span>
                    <h1 className="text-xl font-bold text-black">{title}</h1>
                </div>
                <div className="flex items-center gap-x-2 lg:gap-x-4">
                    <p className="font-semibold text-slate-500 text-md opacity-80">
                        Anh Đức
                    </p>
                    <div className="w-10 h-10 rounded-full">
                        <img
                            src="https://www.w3schools.com/bootstrap4/img_avatar3.png"
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
