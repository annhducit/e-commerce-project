import { ReactNode } from "react";
import Portal from "./Portal";
import { CSSTransition } from "react-transition-group";
export type modalBaseProps = {
    visible: boolean;
    onClose: () => void;
    children: ReactNode;
    contentClassName: string;
};
function ModalBase({
    visible,
    onClose,
    children,
    contentClassName,
}: modalBaseProps): JSX.Element {
    return (
        <>
            <CSSTransition
                in={visible}
                timeout={250}
                unmountOnExit
                classNames="zoom"
            >
                {(status) => (
                    <Portal
                        visible={status !== "exited"}
                        onClose={onClose}
                        containerClassName="flex items-center justify-center"
                        contentStyle={{ transition: "all 250ms" }}
                        contentClassName={contentClassName}
                    >
                        {children}
                    </Portal>
                )}
            </CSSTransition>
        </>
    );
}

export default ModalBase;
