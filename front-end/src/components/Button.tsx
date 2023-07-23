import { MouseEvent, ReactElement } from "react";

interface ButtonAttr {
    text?: string;
    className: string;
    iconLeft?: ReactElement;
    iconRight?: ReactElement;
    normalIcon?: ReactElement;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

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
