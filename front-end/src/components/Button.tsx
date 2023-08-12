import { ReactElement } from "react";

type ButtonAttr = {
    text?: string;
    iconLeft?: ReactElement;
    iconRight?: ReactElement;
    normalIcon?: ReactElement;
} & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

const Button = (item: ButtonAttr) => {
    return (
        <button {...item}>
            {item.normalIcon}
            <span>{item.iconLeft}</span>
            {item.text}
            <span>{item.iconRight}</span>
        </button>
    );
};

export default Button;
