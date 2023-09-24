import MainCarousel from "../components/MainCarousel";
import MainSectionCard from "../components/ProductSectionCard/MainSectionCard";
import { menClothes } from "../../data/dataMenClothes";
import { menJean } from "../../data/dataMenJean";
import { menShirt } from "../../data/dataMenShirt";
import MainAdvertiment from "../components/MainAdvertiment";
import { Link } from "react-router-dom";
import { useState } from "react";

interface LinkItem {
    id: number;
    title: string;
}
const LinkItems: LinkItem[] = [
    { id: 1, title: "All" },
    { id: 2, title: "Men" },
    { id: 3, title: "Women" },
    { id: 4, title: "T_Shirt" },
    { id: 5, title: "Sweater" },
    { id: 6, title: "Jacket" },
    { id: 7, title: "Top" },
    { id: 8, title: "Pants" },
    { id: 9, title: "Activewear" },
];

const HomePage = () => {
    const [active, setActive] = useState<number>(1);

    return (
        <div>
            <MainCarousel />
            <MainAdvertiment />
            <div className="pt-16 pb-6">
                <h2 className="mx-auto font-bold text-7xl text-center leading-tight w-[800px]">
                    CHOOSE THE BEST EVERYDAY WEAR!
                </h2>
            </div>

            <div className="flex items-center justify-center py-10 mx-auto gap-x-6">
                {LinkItems.map((item) => (
                    <Link
                        key={item.id}
                        className={`px-6 py-2 font-bold border-2 border-black rounded-full ${
                            active === item.id &&
                            "text-white bg-black transition-all"
                        }`}
                        to={""}
                        onClick={() => setActive(item.id)}
                    >
                        {item.title}
                    </Link>
                ))}
            </div>
            <MainSectionCard heading="Men Clothes" data={menClothes} />
            <MainSectionCard type={true} heading="Men Jeans" data={menJean} />
            <MainSectionCard type={true} heading="Men Shirts" data={menShirt} />
        </div>
    );
};

export default HomePage;
