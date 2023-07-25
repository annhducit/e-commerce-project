import { MouseEvent, ReactElement } from "react";

type ButtonAttr = {
    text?: string;
    className: string;
    iconLeft?: ReactElement;
    iconRight?: ReactElement;
    normalIcon?: ReactElement;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
} & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

const Button = ({
    text,
    className,
    iconLeft,
    iconRight,
    normalIcon,
    onClick,
}: ButtonAttr) => {
    return (
        <button className={`${className}`} onClick={onClick}>
            {normalIcon}
            <span>{iconLeft}</span>
            {text}
            <span>{iconRight}</span>
        </button>
    );
};

export default Button;
