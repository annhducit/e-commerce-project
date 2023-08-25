/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import ProductType from "../../types/ProductType";
import TippyHandless from "@tippyjs/react/headless";
import Wrapper from "../../components/Wrapper";
import ProductSearchItem from "./ProductSearchItem";
import { FaExclamationCircle, FaSearch, FaSpinner } from "react-icons/fa";
const Search = () => {
    // * For search
    const [result, setResult] = useState<ProductType[]>([1, 2, 3]);
    const [searchValue, setSearchValue] = useState("");
    const [hide, setHide] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const debounce = useDebounce(searchValue, 500);
    const inputRef = useRef<HTMLInputElement>(null);

    // Handle search
    return (
        <TippyHandless
            interactive
            visible={hide && result.length > 0}
            render={(attrs) => (
                <div className="w-[500px] border" tabIndex={1} {...attrs}>
                    <Wrapper>
                        <p className="text-slate-900 font-semibold leading-5 p-2">
                            Results
                        </p>
                        {result.map((item) => (
                            <ProductSearchItem key={item.id} data={item} />
                        ))}
                    </Wrapper>
                </div>
            )}
            onClickOutside={() => {
                setHide(false);
            }}
        >
            <div className="relative w-[500px] h-12 flex items-center rounded-full pl-4 bg-opacity-6 bg-slate-100 border-1.5 border-transparent hover:border-opacity-20 hover:bg-opacity-6">
                <input
                    className="flex-1 outline-none h-full bg-transparent font-light text-md"
                    placeholder="Enter your keyword"
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        setHide(true);
                    }}
                    ref={inputRef}
                    onFocus={() => setHide(true)}
                />
                {!!searchValue && !loading && (
                    <button
                        className="absolute right-14 text-slate-400"
                        onClick={() => {
                            setSearchValue("");
                            setHide(true);
                            inputRef.current?.focus();
                        }}
                    >
                        <FaExclamationCircle />
                    </button>
                )}

                {loading && <FaSpinner className="animate-spin" />}
                <button className="relative w-14 h-full text-xl opacity-70 py-3 px-4 hover:bg-slate-200 rounded-tr-[92px] rounded-br-[90px]">
                    <FaSearch />
                </button>
            </div>
        </TippyHandless>
    );
};

export default Search;
