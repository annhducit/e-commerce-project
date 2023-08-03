type InputType = {
    label?: string;
    leftIcon?: React.ReactElement;
} & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

function Input(items: InputType) {
    return (
        <div>
            <label className="text-gray-500">{items.label}</label>
            <div className="flex items-center px-4 mt-2 bg-gray-100 rounded-lg gap-x-3">
                <span className="leading-none text-blue-400">
                    {items.leftIcon}
                </span>
                <input
                    className="w-full px-2 py-3 bg-transparent rounded-lg outline-none"
                    {...items}
                />
            </div>
        </div>
    );
}

export default Input;
