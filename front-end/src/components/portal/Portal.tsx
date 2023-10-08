import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

function createElement() {
    const element = document.createElement("div");
    element.id = "portal-wrapper";
    return element;
}

type portalProps = {
    containerClassName: string;
    contentClassName: string;
    onClose: () => void;
    visible: boolean;
    containerStyle?: object;
    contentStyle?: object;
    children: ReactNode;
};

const portalWrapperElement = createElement();

function Portal({
    containerClassName = "",
    contentClassName = "",
    onClose = () => {},
    containerStyle = {},
    contentStyle = {},
    children,
}: portalProps) {
    useEffect(() => {
        document.body.appendChild(portalWrapperElement);
    }, []);
    const renderContent = (
        <div
            className={`fixed inset-0 z-[9999] ${containerClassName}`}
            style={containerStyle}
        >
            <div
                className="absolute inset-0 bg-black overlay opacity-20"
                onClick={onClose}
            ></div>
            <div
                className={`content relative z-10 ${contentClassName}`}
                style={contentStyle}
            >
                {children}
            </div>
        </div>
    );

    return createPortal(renderContent, portalWrapperElement);
}

export default Portal;
