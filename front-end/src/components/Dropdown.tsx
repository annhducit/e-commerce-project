import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

import useClickOutSide from "../hooks/useClickOutSide";

import { DropdownItemType } from "../types/DropdownItemType";

const Dropdown = ({ data }: { data: DropdownItemType[] }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>("Vui lòng chọn");
    const { nodeRef } = useClickOutSide();
    return (
        <div className="relative" ref={nodeRef}>
            <div
                onClick={() => setOpen(!open)}
                className="relative flex items-center bg-white px-2 justify-between gap-x-10 w-[180px] h-[30px] border border-[#ff7506] rounded hover:cursor-pointer"
            >
                <div className="pl-2 text-sm font-semibold opacity-40">
                    {value}
                </div>
                <span className="float-right text-[#ff7506]">
                    {open ? <FaCaretUp /> : <FaCaretDown />}
                </span>
            </div>
            {open && (
                <div className="absolute z-50 w-full bg-white border rounded shadow-xl top-9">
                    <ItemDropdown
                        visibleDropdown={setOpen}
                        setValue={setValue}
                        data={data}
                    />
                </div>
            )}
        </div>
    );
};

export default Dropdown;

const ItemDropdown = ({
    data,
    setValue,
    visibleDropdown,
}: {
    data: DropdownItemType[];
    setValue: (title: string) => void;
    visibleDropdown: (state: boolean) => void;
}): JSX.Element => {
    return (
        <>
            {data.map((item) => (
                <>
                    {item.id != 1 && <hr />}
                    <div
                        className="px-1 py-2 bg-white hover:cursor-pointer hover:text-white hover:bg-[#ff7506]"
                        onClick={() => {
                            item.onClick && item.onClick(),
                                setValue(item.title);
                            visibleDropdown(false);
                        }}
                        key={item.id}
                    >
                        {item.to && <Link to={item.to}></Link>}
                        <div className="flex items-center gap-x-2">
                            <span className="text-xl">{item.icon}</span>
                            <p>{item.title}</p>
                        </div>
                    </div>
                </>
            ))}
        </>
    );
};
