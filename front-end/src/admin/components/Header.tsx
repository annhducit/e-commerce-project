import React from "react";

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-20 px-4 bg-white shadow lg:px-8 hover:shadow-lg">
            <div className="flex items-center">
                <h1>Dashboard</h1>
            </div>

            <div className="flex items-center gap-x-2 lg:gap-x-4">
                <p>Anh Đức</p>
                <div className="w-10 h-10 rounded-full">
                    <img
                        src="https://www.w3schools.com/bootstrap4/img_avatar3.png"
                        alt=""
                        className="w-full h-full rounded-full"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
