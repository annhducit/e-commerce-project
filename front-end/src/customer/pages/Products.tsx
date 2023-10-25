import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
    ChevronDownIcon,
    FunnelIcon,
    MinusIcon,
    PlusIcon,
    Squares2X2Icon,
} from "@heroicons/react/20/solid";
import ProductCard from "../components/Product/ProductCard";
import { filter, singleFilter } from "../../data/filterData";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    findProducts,
    sortByDiscountedPriceAndCategory,
} from "../../services/productService";
import { MenClothes } from "../../types/MenClothes";
import { RootState } from "../../redux/globalStore";
import { Pagination } from "@mui/material";
import { AnyAction } from "@reduxjs/toolkit";
import ProductType from "../../types/ProductType";
import { Spin } from "antd";

const sortOptions = [
    {
        name: "Most Popular",
        href: "#",
        sortBy: "price_high",
        current: true,
    },
    {
        name: "Best Rating",
        href: "#",
        sortBy: "price_high",
        current: false,
    },
    {
        name: "Newest",
        href: "#",
        sortBy: "price_high",
        current: false,
    },
    {
        name: "Price: Low to High",
        href: "#",
        sortBy: "price_low",
        current: false,
    },
    {
        name: "Price: High to Low",
        href: "#",
        sortBy: "price_high",
        current: false,
    },
];

export type FilterType = {
    colors: string | never[];
    sizes: string | never[];
    minPrice: string | number;
    maxPrice: string | number;
    minDiscount: string;
    category: string | undefined;
    sort: string;
    pageNumber: number | string;
    pageSize: number;
    stock: string | null;
};

type TypeParams = {
    labelOne: string;
    labelTwo: string;
    labelThree: string | undefined;
};

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(" ");
}

export default function Example() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductType[]>();

    const navigate = useNavigate();
    const param = useParams<TypeParams>();
    const dispatch = useDispatch();

    const { customerProduct } = useSelector((store: RootState) => store);
    useEffect(() => {
        setProducts(customerProduct.products?.content);
    }, [customerProduct.products?.content]);

    const decodedQueryString = decodeURIComponent(location.search);
    const searchParams = new URLSearchParams(decodedQueryString);

    const colorValue = searchParams.get("color");
    const sizeValue = searchParams.get("size");
    const priceValue = searchParams.get("price");
    const discountValue = searchParams.get("discount");
    const stockValue = searchParams.get("stock");
    const sortValue = searchParams.get("sort");
    const pageNumber = searchParams.get("page") || 1;

    useEffect(() => {
        const [minPrice, maxPrice] =
            priceValue === null ? [0, 0] : priceValue.split("-").map(Number);

        const data: FilterType = {
            colors: colorValue || [],
            sizes: sizeValue || [],
            minPrice: minPrice || "",
            maxPrice: maxPrice || "",
            minDiscount: discountValue || "",
            category: param.labelThree,
            sort: sortValue || "price_low",
            pageNumber: pageNumber - 1,
            pageSize: 10,
            stock: stockValue,
        };

        dispatch(findProducts(data) as unknown as AnyAction);
    }, [
        param.labelThree,
        colorValue,
        sizeValue,
        priceValue,
        discountValue,
        stockValue,
        sortValue,
        pageNumber,
        dispatch,
    ]);
    // For checkbox
    const handleFilter = (value: string, sectionId: string) => {
        const searchParam = new URLSearchParams(location.search);
        let filterValue = searchParam.getAll(sectionId);
        if (
            filterValue.length > 0 &&
            filterValue[0].split(",").includes(value)
        ) {
            filterValue = filterValue[0]
                .split(",")
                .filter((item) => item !== value);

            if (filterValue.length === 0) {
                searchParam.delete(sectionId);
            }
        } else {
            filterValue.push(value);
        }
        if (filterValue.length > 0) {
            searchParam.set(sectionId, filterValue.join(","));
        }
        const query = searchParam.toString();
        navigate({ search: `?${query}` });
    };

    // For radio
    const handleRadioFilterChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        sectionId: string
    ) => {
        const searchParam = new URLSearchParams(location.search);
        searchParam.set(sectionId, e.target.value);
        const query = searchParam.toString();
        navigate({ search: `?${query}` });
    };

    const handlePaginationChange = (
        _even: React.ChangeEvent<unknown>,
        pageNumber: string
    ) => {
        const searchPanigation = new URLSearchParams(location.search);
        searchPanigation.set("page", pageNumber);
        const query = searchPanigation.toString();
        navigate({ search: `?${query}` });
    };

    // Filter products
    const handleSortProductByDiscountedPriceAndCategory = (
        sortBy: string,
        category: string
    ) => {
        void (async () => {
            setIsLoading(true);
            const productResult = await sortByDiscountedPriceAndCategory(
                sortBy,
                category
            );
            setProducts(productResult);
            setIsLoading(false);
        })();
    };
    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-40 lg:hidden"
                        onClose={setMobileFiltersOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative flex flex-col w-full h-full max-w-xs py-4 pb-12 ml-auto overflow-y-auto bg-white shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Filters
                                        </h2>
                                        <button
                                            type="button"
                                            className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md"
                                            onClick={() =>
                                                setMobileFiltersOpen(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close menu
                                            </span>
                                            <XMarkIcon
                                                className="w-6 h-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        {filter.map((section) => (
                                            <Disclosure
                                                as="div"
                                                key={section.id}
                                                className="px-4 py-6 border-t border-gray-200"
                                            >
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="flow-root -mx-2 -my-3">
                                                            <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">
                                                                    {
                                                                        section.name
                                                                    }
                                                                </span>
                                                                <span className="flex items-center ml-6">
                                                                    {open ? (
                                                                        <MinusIcon
                                                                            className="w-5 h-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    ) : (
                                                                        <PlusIcon
                                                                            className="w-5 h-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map(
                                                                    (
                                                                        option,
                                                                        optionIdx
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                option.value
                                                                            }
                                                                            className="flex items-center"
                                                                        >
                                                                            <input
                                                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                name={`${section.id}[]`}
                                                                                value={
                                                                                    option.value
                                                                                }
                                                                                type="radio"
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleRadioFilterChange(
                                                                                        e,
                                                                                        section.id
                                                                                    )
                                                                                }
                                                                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                                            />
                                                                            <label
                                                                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                className="flex-1 min-w-0 ml-3 text-gray-500"
                                                                            >
                                                                                {
                                                                                    option.label
                                                                                }
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="max-w-full px-4 mx-auto sm:px-6 lg:px-20">
                    <div className="flex items-baseline justify-between pt-10 pb-6 border-b border-gray-200">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                            Products
                        </h1>

                        <div className="flex items-center">
                            <Menu
                                as="div"
                                className="relative inline-block text-left"
                            >
                                <div>
                                    <Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                                        Sort by
                                        <ChevronDownIcon
                                            className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={option.href}
                                                            className={classNames(
                                                                option.current
                                                                    ? "font-medium text-gray-900"
                                                                    : "text-gray-500",
                                                                active
                                                                    ? "bg-gray-100"
                                                                    : "",
                                                                "block px-4 py-2 text-sm"
                                                            )}
                                                            onClick={() =>
                                                                param.labelThree &&
                                                                handleSortProductByDiscountedPriceAndCategory(
                                                                    option.sortBy,
                                                                    param.labelThree
                                                                )
                                                            }
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <button
                                type="button"
                                className="p-2 ml-5 -m-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                            >
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                />
                            </button>
                            <button
                                type="button"
                                className="p-2 ml-4 -m-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>

                    <section
                        aria-labelledby="products-heading"
                        className="pt-6 pb-24"
                    >
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="items-center hidden pb-3 gap-x-48 lg:flex">
                            <h2 className="font-bold opacity-70">Filter</h2>
                            <FilterListIcon />
                        </div>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-5 ">
                            {/* Filters */}
                            <form className="hidden px-6 border rounded-lg lg:block border-slate-200">
                                {filter.map((section) => (
                                    <Disclosure
                                        as="div"
                                        key={section.id}
                                        className="py-6 border-b border-gray-200"
                                    >
                                        {({ open }) => (
                                            <>
                                                <h3 className="flow-root -my-3">
                                                    <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">
                                                            {section.name}
                                                        </span>
                                                        <span className="flex items-center ml-6">
                                                            {open ? (
                                                                <MinusIcon
                                                                    className="w-5 h-5"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <PlusIcon
                                                                    className="w-5 h-5"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map(
                                                            (
                                                                option,
                                                                optionIdx
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    className="flex items-center"
                                                                >
                                                                    <input
                                                                        id={`filter-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        defaultValue={
                                                                            option.value
                                                                        }
                                                                        onChange={() =>
                                                                            handleFilter(
                                                                                option.value,
                                                                                section.id
                                                                            )
                                                                        }
                                                                        type="checkbox"
                                                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                        className="ml-3 text-sm text-gray-600"
                                                                    >
                                                                        {
                                                                            option.label
                                                                        }
                                                                    </label>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                                {singleFilter.map((section) => (
                                    <Disclosure
                                        as="div"
                                        key={section.id}
                                        className="py-6 border-b border-gray-200"
                                    >
                                        {({ open }) => (
                                            <>
                                                <h3 className="flow-root -my-3">
                                                    <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">
                                                            {section.name}
                                                        </span>
                                                        <span className="flex items-center ml-6">
                                                            {open ? (
                                                                <MinusIcon
                                                                    className="w-5 h-5"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <PlusIcon
                                                                    className="w-5 h-5"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map(
                                                            (
                                                                option,
                                                                optionIdx
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    className="flex items-center"
                                                                >
                                                                    <input
                                                                        id={`filter-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        value={
                                                                            option.value
                                                                        }
                                                                        type="radio"
                                                                        // defaultChecked={
                                                                        //     option.checked
                                                                        // }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleRadioFilterChange(
                                                                                e,
                                                                                section.id
                                                                            )
                                                                        }
                                                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                        className="ml-3 text-sm text-gray-600"
                                                                    >
                                                                        {
                                                                            option.label
                                                                        }
                                                                    </label>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}

                            <div className="flex flex-col w-full p-3 border rounded-lg lg:col-span-4 border-slate-200 gap-y-6">
                                <Spin spinning={isLoading}>
                                    <div className="grid grid-cols-4 gap-x-1">
                                        {products?.map((item: MenClothes) => (
                                            <ProductCard
                                                key={item.id}
                                                product={item}
                                            />
                                        ))}
                                    </div>
                                </Spin>
                                <div className="mx-auto">
                                    <Pagination
                                        count={
                                            customerProduct.products?.totalPages
                                        }
                                        color="secondary"
                                        onChange={handlePaginationChange}
                                    ></Pagination>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
