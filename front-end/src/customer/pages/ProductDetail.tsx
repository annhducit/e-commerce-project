import { useState } from "react";
import { LinearProgress, Rating } from "@mui/material";
import { RadioGroup } from "@headlessui/react";
import Button from "../../components/Button";
import ProductReviewCard from "../components/ProductReviewCard";
import { menShirt } from "../../data/dataMenShirt";
import ProductItem from "../components/ProductSectionCard/ProductItem";

const product = {
    name: "Basic Tee 6-Pack",
    price: "$192",
    href: "#",
    breadcrumbs: [
        { id: 1, name: "Men", href: "#" },
        { id: 2, name: "Clothing", href: "#" },
    ],
    images: [
        {
            src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
            alt: "Two each of gray, white, and black shirts laying flat.",
        },
        {
            src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
            alt: "Model wearing plain black basic tee.",
        },
        {
            src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
            alt: "Model wearing plain gray basic tee.",
        },
        {
            src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
            alt: "Model wearing plain white basic tee.",
        },
    ],
    colors: [
        { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
        { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
        { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
    ],
    sizes: [
        { name: "S", inStock: true },
        { name: "M", inStock: true },
        { name: "L", inStock: true },
        { name: "XL", inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        "Hand cut and sewn locally",
        "Dyed with our proprietary colors",
        "Pre-washed & pre-shrunk",
        "Ultra-soft 100% cotton",
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(" ");
}
export default function ProductDetail() {
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

    return (
        <div className="bg-white">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol
                        role="list"
                        className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
                    >
                        {product.breadcrumbs.map((breadcrumb) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                    <a
                                        href={breadcrumb.href}
                                        className="mr-2 text-sm font-medium text-gray-900"
                                    >
                                        {breadcrumb.name}
                                    </a>
                                    <svg
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                        ))}
                        <li className="text-sm">
                            <a
                                href={product.href}
                                aria-current="page"
                                className="font-medium text-gray-500 hover:text-gray-600"
                            >
                                {product.name}
                            </a>
                        </li>
                    </ol>
                </nav>
                <section className="grid grid-cols-2 gap-y-10 pt-6">
                    {/* Image gallery */}
                    <div className="flex items-center flex-col">
                        <div className="overflow-hidden rounded-lg max-w-full max-h-[36rem]">
                            <img
                                src={product.images[0].src}
                                alt={product.images[0].alt}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="flex flex-wrap gap-x-6 justify-center pt-3">
                            {product.images.map((image) => (
                                <div className="max-w-[5rem] max-h-[5rem] overflow-hidden rounded-lg">
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Product info */}
                    <div className="lg:col-span-1 mx-auto px-4 pb-16 sm:px-6 lg:lg:pr-20">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 flex flex-col gap-y-2">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {product.name}
                            </h1>
                            <h2 className="text-xl font-semibold text-slate-400">
                                Casual Puff Sleeves Solid Women White Top
                            </h2>
                            <div className="flex items-center gap-x-4">
                                <span className="text-lg font-semibold">
                                    $199
                                </span>
                                <span className="text-lg font-semibold line-through text-slate-400">
                                    $211
                                </span>
                                <span className="text-lg font-semibold text-indigo-600 ">
                                    5% Off
                                </span>
                            </div>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>

                            {/* Reviews */}
                            <div className="mt-6 flex items-center gap-x-3">
                                <Rating name="read-only" value={5.5} readOnly />
                                <p className="opacity-50 text-sm">
                                    50493 Ratings
                                </p>
                                <p className="text-indigo-600 font-medium hover:text-indigo-500">
                                    3858 Reviews
                                </p>
                            </div>

                            <form className="mt-10">
                                {/* Colors */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">
                                        Color
                                    </h3>

                                    <RadioGroup
                                        value={selectedColor}
                                        onChange={setSelectedColor}
                                        className="mt-4"
                                    >
                                        <RadioGroup.Label className="sr-only">
                                            Choose a color
                                        </RadioGroup.Label>
                                        <div className="flex items-center space-x-3">
                                            {product.colors.map((color) => (
                                                <RadioGroup.Option
                                                    key={color.name}
                                                    value={color}
                                                    className={({
                                                        active,
                                                        checked,
                                                    }) =>
                                                        classNames(
                                                            color.selectedClass,
                                                            active && checked
                                                                ? "ring ring-offset-1"
                                                                : "",
                                                            !active && checked
                                                                ? "ring-2"
                                                                : "",
                                                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                                        )
                                                    }
                                                >
                                                    <RadioGroup.Label
                                                        as="span"
                                                        className="sr-only"
                                                    >
                                                        {color.name}
                                                    </RadioGroup.Label>
                                                    <span
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            color.class,
                                                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                                                        )}
                                                    />
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Sizes */}
                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">
                                            Size
                                        </h3>
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Size guide
                                        </a>
                                    </div>

                                    <RadioGroup
                                        value={selectedSize}
                                        onChange={setSelectedSize}
                                        className="mt-4"
                                    >
                                        <RadioGroup.Label className="sr-only">
                                            Choose a size
                                        </RadioGroup.Label>
                                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                            {product.sizes.map((size) => (
                                                <RadioGroup.Option
                                                    key={size.name}
                                                    value={size}
                                                    disabled={!size.inStock}
                                                    className={({ active }) =>
                                                        classNames(
                                                            size.inStock
                                                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                                                            active
                                                                ? "ring-2 ring-indigo-500"
                                                                : "",
                                                            "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                                        )
                                                    }
                                                >
                                                    {({ active, checked }) => (
                                                        <>
                                                            <RadioGroup.Label as="span">
                                                                {size.name}
                                                            </RadioGroup.Label>
                                                            {size.inStock ? (
                                                                <span
                                                                    className={classNames(
                                                                        active
                                                                            ? "border"
                                                                            : "border-2",
                                                                        checked
                                                                            ? "border-indigo-500"
                                                                            : "border-transparent",
                                                                        "pointer-events-none absolute -inset-px rounded-md"
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                >
                                                                    <svg
                                                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                        viewBox="0 0 100 100"
                                                                        preserveAspectRatio="none"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <line
                                                                            x1={
                                                                                0
                                                                            }
                                                                            y1={
                                                                                100
                                                                            }
                                                                            x2={
                                                                                100
                                                                            }
                                                                            y2={
                                                                                0
                                                                            }
                                                                            vectorEffect="non-scaling-stroke"
                                                                        />
                                                                    </svg>
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>

                                <Button
                                    type="submit"
                                    text="Add to cart"
                                    className="px-8 font-semibold py-4 mt-6 bg-indigo-600 text-white rounded-lg"
                                ></Button>
                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">
                                        {product.description}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">
                                    Highlights
                                </h3>

                                <div className="mt-4">
                                    <ul
                                        role="list"
                                        className="list-disc space-y-2 pl-4 text-sm"
                                    >
                                        {product.highlights.map((highlight) => (
                                            <li
                                                key={highlight}
                                                className="text-gray-400"
                                            >
                                                <span className="text-gray-600">
                                                    {highlight}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">
                                    Details
                                </h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-gray-600">
                                        {product.details}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Rating and reviews */}
                <section className="px-20 border border-slate-200 py-6">
                    <h1 className="text-xl font-bold">
                        Recent Reviews and Rating
                    </h1>
                    <div className="grid grid-rows-1">
                        <div className="grid grid-cols-3">
                            <div className="flex flex-col gap-y-3 col-span-2">
                                {[1, 2, 3].map((item) => (
                                    <ProductReviewCard key={item} />
                                ))}
                            </div>
                            <div className="px-6 flex flex-col gap-y-2">
                                <h1 className="font-semibold text-xl">
                                    Product Ratings
                                </h1>
                                <div className="flex flex-col gap-y-3">
                                    <div className="flex items-center gap-x-3">
                                        <Rating
                                            name="read-only"
                                            value={4.5}
                                            readOnly
                                        />
                                        <span className="font-sm text-slate-400">
                                            50493 Ratings
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <p className="font-semibold opacity-70 text-sm w-20">
                                            Exellent
                                        </p>
                                        <LinearProgress
                                            sx={{
                                                bgcolor: "#d0d0d0",
                                                borderRadius: 4,
                                                height: 7,
                                                width: "70%",
                                            }}
                                            variant="determinate"
                                            value={70}
                                            color="primary"
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <p className="font-semibold opacity-70 text-sm w-20">
                                            Very good
                                        </p>
                                        <LinearProgress
                                            sx={{
                                                bgcolor: "#d0d0d0",
                                                borderRadius: 4,
                                                height: 7,
                                                width: "70%",
                                            }}
                                            variant="determinate"
                                            value={60}
                                            color="primary"
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <p className="font-semibold opacity-70 text-sm w-20">
                                            Good
                                        </p>
                                        <LinearProgress
                                            sx={{
                                                bgcolor: "#d0d0d0",
                                                borderRadius: 4,
                                                height: 7,
                                                width: "70%",
                                            }}
                                            variant="determinate"
                                            value={55}
                                            color="success"
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <p className="font-semibold opacity-70 text-sm w-20">
                                            Average
                                        </p>
                                        <LinearProgress
                                            sx={{
                                                bgcolor: "#d0d0d0",
                                                borderRadius: 4,
                                                height: 7,
                                                width: "70%",
                                            }}
                                            variant="determinate"
                                            value={20}
                                            color="warning"
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <p className="font-semibold opacity-70 text-sm w-20">
                                            Poor
                                        </p>
                                        <LinearProgress
                                            sx={{
                                                bgcolor: "#d0d0d0",
                                                borderRadius: 4,
                                                height: 7,
                                                width: "70%",
                                            }}
                                            variant="determinate"
                                            value={10}
                                            color="error"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Similar product */}
                <section className="px-20 py-10">
                    <h1 className="text-xl font-bold">Similar Products</h1>
                    <div className="grid grid-cols-5 gap-6 pt-6">
                        {menShirt.map((item) => (
                            <ProductItem product={item} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
