import { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import ProductItem from "./ProductItem";
import Button from "../../../components/Button";
import { MenClothes } from "../../../types/MenClothes";

const MainSectionCard = ({
    heading,
    data,
    type,
}: {
    heading: string;
    data: MenClothes[];
    type?: boolean;
}) => {
    const responsiveLarge = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 4.5 },
    };
    const responsiveSmall = {
        0: { items: 1 },
        568: { items: 4 },
        1024: { items: 5.5 },
    };

    const items = data
        .slice(0, 10)
        .map((item) => (
            <ProductItem type={type} key={item.price} product={item} />
        ));

    const [activeIndex, setActiveIndex] = useState<number>(0);

    const nextSlide = () => {
        setActiveIndex(activeIndex + 1);
    };
    const previousSlide = () => {
        setActiveIndex(activeIndex - 1);
    };

    return (
        <div className="px-4 mb-4">
            <h2 className="pl-3 text-2xl font-bold">{heading}</h2>
            <div className="relative p-6 m-3 border border-slate-200">
                <AliceCarousel
                    disableButtonsControls
                    mouseTracking
                    disableDotsControls
                    animationDuration={1000}
                    responsive={type ? responsiveLarge : responsiveSmall}
                    items={items}
                    activeIndex={activeIndex}
                />
                {activeIndex !== items.length - 4 && (
                    <Button
                        onClick={nextSlide}
                        normalIcon={<FaArrowRight />}
                        className="py-4 px-2 hover:bg-slate-300 transition-all top-[50%] bg-slate-200 rounded absolute -right-5"
                    ></Button>
                )}
                {activeIndex !== 0 && (
                    <Button
                        normalIcon={<FaArrowLeft />}
                        onClick={previousSlide}
                        className="py-4 px-2 hover:bg-slate-300 transition-all top-[50%] bg-slate-200 rounded absolute -left-5"
                    ></Button>
                )}
            </div>
        </div>
    );
};

export default MainSectionCard;
