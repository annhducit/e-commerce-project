import { useEffect, useState } from "react";

function useDebounce(value: string, delay = 600) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [delay, value]);
    return debounceValue;
}

export default useDebounce;
