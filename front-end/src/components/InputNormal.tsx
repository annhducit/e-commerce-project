import { ReactNode, useRef } from "react";
import { useEffect } from "react";

type InputType = {
    value?: string;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    leftIcon?: ReactNode;
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
            <label className="text-[#232354] font-semibold">{item.label}</label>
            <div className="flex items-center px-4 mt-2 bg-gray-100 rounded-lg gap-x-3">
                <span className="leading-none text-purple-400">
                    {item.leftIcon}
                </span>
                <input ref={inpref} onChange={item.handleChange} {...item} />
            </div>
        </div>
    );
}

export default InputNormal;
