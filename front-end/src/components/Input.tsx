import { useController, Control } from "react-hook-form";
import AuthType from "../types/RegisterType";

// type TypeInput = "Authenticate" | "Normal";

type InputType = {
    label?: string;
    lefticon?: React.ReactElement;
    error?: string;
    control?: Control<AuthType>;
    name: keyof AuthType;
} & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

function Input(items: InputType) {
    const { field } = useController({
        name: items.name,
        control: items.control,
        defaultValue: "",
    });
    return (
        <div>
            <label className="text-[#232354] font-semibold">
                {items.label}
            </label>
            <div className="flex items-center px-4 mt-2 bg-gray-100 rounded-lg gap-x-3">
                <span className="leading-none text-purple-400">
                    {items.lefticon}
                </span>
                <input
                    className="w-full px-2 py-3 bg-transparent rounded-lg outline-none"
                    {...field}
                    {...items}
                />
            </div>
            <p className="text-sm pt-1 text-red-600">{items.error}</p>
        </div>
    );
}

export default Input;
