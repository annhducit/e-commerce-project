import { useEffect, useRef, useState } from "react";

export default function useClickOutSide() {
    const [visible, setVisible] = useState<boolean>(false);

    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutSide(even: MouseEvent) {
            if (
                nodeRef.current &&
                !nodeRef.current.contains(even.target as Node)
            ) {
                setVisible(true);
            }
        }
        document.addEventListener("click", handleClickOutSide);
        return () => {
            document.removeEventListener("click", handleClickOutSide);
        };
    }, []);

    return {
        nodeRef,
        visible,
        setVisible,
    };
}
