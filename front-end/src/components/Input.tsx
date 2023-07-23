import { useRef } from "react";
import { useEffectOnce } from "usehooks-ts";

type InputType = {
    value?: string;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

function Input(item: InputType) {
    const inpref = useRef<HTMLInputElement>(null);
    useEffectOnce(() => {
        inpref.current?.focus();
    });
    return <input ref={inpref} onChange={item.handleChange} {...item} />;
}

export default Input;
