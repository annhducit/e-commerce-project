import ModalBase, { modalBaseProps } from "./ModalBase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

type ModalAdvance = {
    header: string;
    children?: ReactNode;
    props: modalBaseProps;
    footer?: ReactNode;
};
function ModalAdvance({ header, children, footer, props }: ModalAdvance) {
    return (
        <div className="flex flex-col ">
            <ModalBase {...props}>
                <HeaderModal header={header} props={props} />

                <div className="w-[450px] h-[400px] py-4"> {children}</div>

                {footer && <FooterModal footer={footer} />}
            </ModalBase>
        </div>
    );
}

function HeaderModal({ header, props }: ModalAdvance) {
    return (
        <div className="py-2 border-b-2 header">
            <span
                onClick={props.onClose}
                className="absolute top-0 right-0 w-10 h-10 p-1 bg-white rounded-full cursor-pointer -translate-y-2/4 translate-x-2/4"
            >
                <FontAwesomeIcon
                    className="absolute w-6 h-6 opacity-40 right-2 top-2"
                    icon={faXmark}
                />
            </span>
            <h2 className="mb-2 text-2xl font-medium text-left text-black">
                {header}
            </h2>
        </div>
    );
}

function FooterModal({ footer }: { footer: ReactNode }): JSX.Element {
    return (
        <div className="flex flex-col py-4 gap-y-4">
            <div className="w-full bg-slate-300 h-[1px]"></div>
            <div className="flex items-center ml-auto modal-footer gap-x-2">
                {footer}
            </div>
        </div>
    );
}

export default ModalAdvance;
