import { useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import ProductType from "../../types/ProductType";
import TippyHandless from "@tippyjs/react/headless";
import Wrapper from "../../components/Wrapper";
import ProductSearchItem from "./ProductSearchItem";
import { searchProductByKeyword } from "../../services/productService";

import { FaRemoveFormat, FaSearch, FaSpinner } from "react-icons/fa";
const Search = () => {
    // * For search
    const [result, setResult] = useState<ProductType[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [hide, setHide] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const debounce = useDebounce(searchValue, 500);
    const inputRef = useRef<HTMLInputElement>(null);
    const [visibleResults, setVisibleResults] = useState<number>(5);
    const productsPerPage = 5;

    const hasMoreResults = result?.length > visibleResults;

    const loadMoreResults = () => {
        setVisibleResults(
            (prevVisibleResults) => prevVisibleResults + productsPerPage
        );
    };

    // Handle search
    useEffect(() => {
        void (async () => {
            setLoading(true);
            const productResult = await searchProductByKeyword(debounce);
            setResult(productResult);
            setLoading(false);
        })();
    }, [debounce]);
    return (
        <TippyHandless
            interactive
            visible={result?.length >= 0 && hide}
            render={(attrs) => (
                <div className="w-[500px] border" tabIndex={1} {...attrs}>
                    <Wrapper>
                        <p className="p-2 font-semibold leading-5 text-slate-900">
                            Results
                        </p>
                        {result?.length > 0 ? (
                            <>
                                {result
                                    ?.slice(0, visibleResults)
                                    .map((item) => (
                                        <ProductSearchItem
                                            key={item.id}
                                            data={item}
                                        />
                                    ))}
                                {hasMoreResults && (
                                    <button
                                        className="w-full py-2 text-indigo-500 transition-all hover:underline"
                                        onClick={loadMoreResults}
                                    >
                                        {`Xem thêm ${
                                            result?.length - visibleResults
                                        } sản phẩm`}
                                    </button>
                                )}
                            </>
                        ) : (
                            <p className="pb-2 text-center">
                                Không tìm thấy kết quả phù hợp
                            </p>
                        )}
                    </Wrapper>
                </div>
            )}
            onClickOutside={() => {
                setHide(false);
            }}
        >
            <div className="relative w-[500px] h-12 flex items-center rounded-full pl-4 bg-opacity-6  border border-slate-200 hover:border-opacity-90">
                <input
                    className="flex-1 h-full font-light bg-transparent outline-none text-md"
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
                        <FaRemoveFormat />
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
