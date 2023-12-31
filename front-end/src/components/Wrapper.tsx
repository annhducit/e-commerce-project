import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="absolute w-full bg-white shadow-md rounded pt-2 max-h-[450px] overflow-y-scroll box-border list-none">
            {children}
        </div>
    );
};

export default Wrapper;
