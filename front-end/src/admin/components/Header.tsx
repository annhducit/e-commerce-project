const Header = () => {
    return (
        <header className="absolute z-50 flex items-center w-full h-20 px-4 bg-white shadow lg:px-8 hover:shadow-lg">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl font-bold text-[#ff7506]">Dashboard</h1>
                <div className="flex items-center gap-x-2 lg:gap-x-4">
                    <p className="font-semibold text-[#ff7506] text-md opacity-80">
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
