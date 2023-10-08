import ModalBase, { modalBaseProps } from "./ModalBase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

type ModalAdvance = {
    header: string;
    children?: ReactNode;
    props: modalBaseProps;
};
function ModalAdvance({ header, children, props }: ModalAdvance) {
    return (
        <>
            <ModalBase {...props}>
                <span
                    onClick={props.onClose}
                    className="absolute top-0 right-0 w-10 h-10 p-1 bg-white rounded-full cursor-pointer -translate-y-2/4 translate-x-2/4"
                >
                    <FontAwesomeIcon
                        className="absolute w-6 h-6 opacity-40 right-2 top-2"
                        icon={faXmark}
                    />
                </span>
                <h2 className="mb-5 text-4xl font-medium text-center text-black">
                    {header}
                </h2>
                {children}
            </ModalBase>
        </>
    );
}

export default ModalAdvance;
