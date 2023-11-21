import ModalBase, { modalBaseProps } from "./ModalBase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

type ModalAdvance = {
    header: string;
    children?: ReactNode;
    props: modalBaseProps;
    footer?: ReactNode;
    size?: SizeModal;
};

type SizeModal = "sm" | "md" | "lg" | "xl";

const distanceModal = (size: SizeModal) => {
    const distance = `${
        size === "sm"
            ? "w-[320px] h-[150px]"
            : size === "md"
            ? "w-[500px] h-[400px]"
            : size === "lg"
            ? "w-[700px] h-[500px]"
            : size === "xl"
            ? "w-[900px] h-[700px]"
            : ""
    }`;
    return distance;
};
function ModalAdvance({
    header,
    children,
    footer,
    size = "md",
    props,
}: ModalAdvance) {
    return (
        <div className="flex flex-col">
            <ModalBase {...props}>
                <HeaderModal header={header} props={props} />

                <div className={distanceModal(size)}>
                    <div className="w-full bg-slate-200 h-[1px]"></div>
                    <div className="w-full p-6"> {children}</div>
                </div>

                {footer && <FooterModal footer={footer} />}
            </ModalBase>
        </div>
    );
}

function HeaderModal({ header, props }: ModalAdvance) {
    return (
        <div className="py-2 header">
            <span
                onClick={props.onClose}
                className="absolute w-10 h-10 p-1 text-black transition-all bg-transparent rounded cursor-pointer right-7 top-7 hover:bg-slate-200 -translate-y-2/4 translate-x-2/4"
            >
                <FontAwesomeIcon
                    className="absolute w-6 h-6 opacity-40 right-2 top-2"
                    icon={faXmark}
                />
            </span>
            <h2 className="px-6 mb-2 text-xl font-medium text-left text-black">
                {header}
            </h2>
        </div>
    );
}

function FooterModal({ footer }: { footer: ReactNode }): JSX.Element {
    return (
        <div className="flex flex-col gap-y-3">
            <div className="w-full bg-slate-200 h-[1px]"></div>
            <div className="items-center px-4 py-1 pb-3 ml-auto modal-footer">
                {footer}
            </div>
        </div>
    );
}

export default ModalAdvance;
