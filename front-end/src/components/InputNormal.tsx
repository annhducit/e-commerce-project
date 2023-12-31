import { ReactNode, useRef } from "react";
import { useEffect } from "react";

type Role = "Admin" | "Customer";
type InputType = {
    value?: string;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    leftIcon?: ReactNode;
    role?: Role;
} & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

function InputNormal(item: InputType) {
    const inpref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inpref.current?.focus();
    }, []);

    return (
        <div>
            {item.label && (
                <label className="text-[#232354] font-semibold block mb-2">
                    {item.label}
                </label>
            )}
            <div className="flex items-center px-4 bg-gray-100 rounded-lg gap-x-4">
                <span
                    className={`leading-none ${
                        item.role === "Admin"
                            ? "text-[#ff7506]"
                            : "text-[#64a1ff]"
                    }`}
                >
                    {item.leftIcon}
                </span>
                <input ref={inpref} onChange={item.handleChange} {...item} />
            </div>
        </div>
    );
}

export default InputNormal;
