import { Fragment, useState } from "react";

import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
    Bars3Icon,
    ShoppingBagIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { navigation } from "../../data/navigationData";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import user from "../../assets/images/admin.png";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserProfile, logoutAccount } from "../../services/authService";
import Button from "../../components/Button";
import {
    Category,
    CategorySection,
    SectionItem,
} from "../../types/CategoryType";
import { RootState } from "../../redux/globalStore";
import { getCart } from "../../services/cartService";

import Search from "./Search";
import { FaBell } from "react-icons/fa";
import { useAppSelector } from "../../hooks/dispatchHook";
import { AnyAction } from "@reduxjs/toolkit";

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleCategoryClick = (
        category: Category,
        section: CategorySection,
        item: SectionItem,
        close: () => void
    ): void => {
        navigate(`/${category.id}/${section.id}/${item.href}`);
        close();
    };

    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const { auth } = useAppSelector((store) => store);

    useEffect(() => {
        if (token) {
            dispatch(getUserProfile(token) as unknown as AnyAction);
        }
    }, [token, auth.jwt, dispatch]);

    const handleLogout = () => {
        dispatch(logoutAccount() as unknown as AnyAction);
    };
    const { cart } = useSelector((store: RootState) => store);

    useEffect(() => {
        dispatch(getCart() as unknown as AnyAction);
    }, [cart.handleAddItemToCart, dispatch]);

    return (
        <div className="bg-white">
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-40 lg:hidden"
                    onClose={setOpen}
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
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex flex-col w-full max-w-xs pb-12 overflow-y-auto bg-white shadow-xl">
                                <div className="flex px-4 pt-5 pb-2">
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md"
                                        onClick={() => setOpen(false)}
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

                                {/* Links */}
                                <Tab.Group as="div" className="mt-2">
                                    <div className="border-b border-gray-200">
                                        <Tab.List className="flex px-4 -mb-px space-x-8">
                                            {navigation.categories.map(
                                                (category) => (
                                                    <Tab
                                                        key={category.name}
                                                        className={({
                                                            selected,
                                                        }) =>
                                                            classNames(
                                                                selected
                                                                    ? "border-indigo-600 text-indigo-600"
                                                                    : "border-transparent text-gray-900",
                                                                "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                                                            )
                                                        }
                                                    >
                                                        {category.name}
                                                    </Tab>
                                                )
                                            )}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {navigation.categories.map(
                                            (category) => (
                                                <Tab.Panel
                                                    key={category.name}
                                                    className="px-4 pt-10 pb-8 space-y-10"
                                                >
                                                    <div className="grid grid-cols-2 gap-x-4">
                                                        {category.featured.map(
                                                            (item) => (
                                                                <div
                                                                    key={
                                                                        item.name
                                                                    }
                                                                    className="relative text-sm group"
                                                                >
                                                                    <div className="overflow-hidden bg-gray-100 rounded-lg aspect-h-1 aspect-w-1 group-hover:opacity-75">
                                                                        <img
                                                                            src={
                                                                                item.imageSrc
                                                                            }
                                                                            alt={
                                                                                item.imageAlt
                                                                            }
                                                                            className="object-cover object-center"
                                                                        />
                                                                    </div>
                                                                    <a
                                                                        href={
                                                                            item.href
                                                                        }
                                                                        className="block mt-6 font-medium text-gray-900"
                                                                    >
                                                                        <span
                                                                            className="absolute inset-0 z-10"
                                                                            aria-hidden="true"
                                                                        />
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </a>
                                                                    <p
                                                                        aria-hidden="true"
                                                                        className="mt-1"
                                                                    >
                                                                        Shop now
                                                                    </p>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                    {category.sections.map(
                                                        (section) => (
                                                            <div
                                                                key={
                                                                    section.name
                                                                }
                                                            >
                                                                <p
                                                                    id={`${category.id}-${section.id}-heading-mobile`}
                                                                    className="font-medium text-gray-900"
                                                                >
                                                                    {
                                                                        section.name
                                                                    }
                                                                </p>
                                                                <ul
                                                                    role="list"
                                                                    aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                                    className="flex flex-col mt-6 space-y-6"
                                                                >
                                                                    {section.items.map(
                                                                        (
                                                                            item
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    item.name
                                                                                }
                                                                                className="flow-root"
                                                                            >
                                                                                <a
                                                                                    href={
                                                                                        item.href
                                                                                    }
                                                                                    className="block p-2 -m-2 text-gray-500"
                                                                                >
                                                                                    {
                                                                                        item.name
                                                                                    }
                                                                                </a>
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        )
                                                    )}
                                                </Tab.Panel>
                                            )
                                        )}
                                    </Tab.Panels>
                                </Tab.Group>

                                <div className="px-4 py-6 space-y-6 border-t border-gray-200">
                                    {navigation.pages.map((page) => (
                                        <div
                                            key={page.name}
                                            className="flow-root"
                                        >
                                            <a
                                                href={page.href}
                                                className="block p-2 -m-2 font-medium text-gray-900"
                                            >
                                                {page.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>

                                <div className="px-4 py-6 space-y-6 border-t border-gray-200">
                                    <div className="flow-root">
                                        <a
                                            href="#"
                                            className="block p-2 -m-2 font-medium text-gray-900"
                                        >
                                            Sign in
                                        </a>
                                    </div>
                                    <div className="flow-root">
                                        <a
                                            href="#"
                                            className="block p-2 -m-2 font-medium text-gray-900"
                                        >
                                            Create account
                                        </a>
                                    </div>
                                </div>

                                <div className="px-4 py-6 border-t border-gray-200">
                                    <a
                                        href="#"
                                        className="flex items-center p-2 -m-2"
                                    >
                                        <img
                                            src="https://tailwindui.com/img/flags/flag-canada.svg"
                                            alt=""
                                            className="flex-shrink-0 block w-5 h-auto"
                                        />
                                        <span className="block ml-3 text-base font-medium text-gray-900">
                                            CAD
                                        </span>
                                        <span className="sr-only">
                                            , change currency
                                        </span>
                                    </a>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="relative z-50 bg-white">
                <nav
                    aria-label="Top"
                    className="max-w-full px-4 mx-auto sm:px-6 lg:px-20"
                >
                    <div className="border-b border-gray-200">
                        <div className="flex items-center h-20">
                            <button
                                type="button"
                                className="p-2 text-gray-400 bg-white rounded-md lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                />
                            </button>

                            {/* Logo */}
                            <div className="flex ml-4 lg:ml-0">
                                <a href="#">
                                    <span className="sr-only">
                                        Your Company
                                    </span>
                                    <div className="h-14 w-[120px]">
                                        <img
                                            className="object-cover w-full h-full"
                                            src={logo}
                                            alt=""
                                        />
                                    </div>
                                </a>
                            </div>

                            {/* Flyout menus */}
                            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="flex h-full space-x-8">
                                    {navigation.categories.map((category) => (
                                        <Popover
                                            key={category.name}
                                            className="flex"
                                        >
                                            {({ open }) => (
                                                <>
                                                    <div className="relative flex">
                                                        <Popover.Button
                                                            className={classNames(
                                                                open
                                                                    ? "border-indigo-600 text-indigo-600"
                                                                    : "border-transparent text-gray-700 hover:text-gray-800",
                                                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                                                            )}
                                                        >
                                                            {category.name}
                                                        </Popover.Button>
                                                    </div>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="transition ease-in duration-150"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Popover.Panel className="absolute inset-x-0 text-sm text-gray-500 top-full">
                                                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                            <div
                                                                className="absolute inset-0 bg-white shadow top-1/2"
                                                                aria-hidden="true"
                                                            />

                                                            <div className="relative bg-white">
                                                                <div className="px-8 mx-auto max-w-7xl">
                                                                    <div className="grid grid-cols-2 py-16 gap-x-8 gap-y-10">
                                                                        <div className="grid grid-cols-2 col-start-2 gap-x-8">
                                                                            {category.featured.map(
                                                                                (
                                                                                    item
                                                                                ) => (
                                                                                    <div
                                                                                        key={
                                                                                            item.name
                                                                                        }
                                                                                        className="relative text-base group sm:text-sm"
                                                                                    >
                                                                                        <div className="overflow-hidden bg-gray-100 rounded-lg aspect-h-1 aspect-w-1 group-hover:opacity-75">
                                                                                            <img
                                                                                                src={
                                                                                                    item.imageSrc
                                                                                                }
                                                                                                alt={
                                                                                                    item.imageAlt
                                                                                                }
                                                                                                className="object-cover object-center"
                                                                                            />
                                                                                        </div>
                                                                                        <a
                                                                                            href={
                                                                                                item.href
                                                                                            }
                                                                                            className="block mt-6 font-medium text-gray-900"
                                                                                        >
                                                                                            <span
                                                                                                className="absolute inset-0 z-10"
                                                                                                aria-hidden="true"
                                                                                            />
                                                                                            {
                                                                                                item.name
                                                                                            }
                                                                                        </a>
                                                                                        <p
                                                                                            aria-hidden="true"
                                                                                            className="mt-1"
                                                                                        >
                                                                                            Shop
                                                                                            now
                                                                                        </p>
                                                                                    </div>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                        <div className="grid grid-cols-3 row-start-1 text-sm gap-x-8 gap-y-10">
                                                                            {category.sections.map(
                                                                                (
                                                                                    section
                                                                                ) => (
                                                                                    <div
                                                                                        key={
                                                                                            section.name
                                                                                        }
                                                                                    >
                                                                                        <p
                                                                                            id={`${section.name}-heading`}
                                                                                            className="font-medium text-gray-900"
                                                                                        >
                                                                                            {
                                                                                                section.name
                                                                                            }
                                                                                        </p>
                                                                                        <ul
                                                                                            role="list"
                                                                                            aria-labelledby={`${section.name}-heading`}
                                                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                        >
                                                                                            {section.items.map(
                                                                                                (
                                                                                                    item
                                                                                                ) => (
                                                                                                    <li
                                                                                                        key={
                                                                                                            item.name
                                                                                                        }
                                                                                                        className="flex"
                                                                                                    >
                                                                                                        <p
                                                                                                            onClick={() =>
                                                                                                                handleCategoryClick(
                                                                                                                    category,
                                                                                                                    section,
                                                                                                                    item,
                                                                                                                    close
                                                                                                                )
                                                                                                            }
                                                                                                            className="cursor-pointer hover:text-gray-800"
                                                                                                        >
                                                                                                            {
                                                                                                                item.name
                                                                                                            }
                                                                                                        </p>
                                                                                                    </li>
                                                                                                )
                                                                                            )}
                                                                                        </ul>
                                                                                    </div>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                    ))}

                                    {navigation.pages.map((page) => (
                                        <a
                                            key={page.name}
                                            href={page.href}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            {page.name}
                                        </a>
                                    ))}
                                </div>
                            </Popover.Group>
                            {/* Search */}
                            <div className="flex items-center ml-auto">
                                <div className="relative flex lg:mx-auto">
                                    <Search />
                                </div>
                                {auth.user ? (
                                    <div className="hidden lg:ml-8 lg:flex">
                                        <Link
                                            to="../../account"
                                            className="flex items-center text-gray-700 hover:text-gray-800"
                                        >
                                            <img
                                                src={user}
                                                alt=""
                                                className="flex-shrink-0 block w-10 h-10 rounded-full"
                                            />
                                            <span className="block ml-3 text-sm font-medium">
                                                {auth.user?.firstName}{" "}
                                                {auth.user?.lastName}
                                            </span>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="hidden ml-4 lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        <Link
                                            to={"signin"}
                                            className="px-2 py-1 text-white transition-all bg-purple-500 rounded hover:bg-purple-600"
                                        >
                                            {" "}
                                            Sign in
                                        </Link>
                                        <span
                                            className="w-px h-6 bg-gray-200"
                                            aria-hidden="true"
                                        />
                                        <Link
                                            to={"signup"}
                                            className="text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            Create account
                                        </Link>
                                    </div>
                                )}

                                {/* Cart */}
                                <div className="flex items-center ml-4 gap-x-4 lg:ml-6">
                                    <Link
                                        to={"cart"}
                                        className="relative flex items-center p-2 -m-2 group"
                                    >
                                        <ShoppingBagIcon
                                            className="flex-shrink-0 w-6 h-6 text-indigo-500 hover:text-indigo-600"
                                            aria-hidden="true"
                                        />
                                        <span className="absolute top-0 px-[5px] text-[11px] text-white bg-indigo-500 rounded-full right-1">
                                            {cart.cart?.totalItem}
                                        </span>
                                        <span className="sr-only">
                                            items in cart, view bag
                                        </span>
                                    </Link>
                                    {auth.user && (
                                        <>
                                            <span>
                                                <FaBell className="flex-shrink-0 w-6 h-6 text-indigo-500 hover:text-indigo-600" />
                                            </span>
                                            <Button
                                                onClick={handleLogout}
                                                text="Sign out"
                                                className="px-2 py-1 text-white bg-red-500 rounded"
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}
