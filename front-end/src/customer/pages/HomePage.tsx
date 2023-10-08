import MainCarousel from "../components/MainCarousel";
import MainSectionCard from "../components/ProductSectionCard/MainSectionCard";
import { menClothes } from "../../data/dataMenClothes";
import { menJean } from "../../data/dataMenJean";
import { menShirt } from "../../data/dataMenShirt";
import MainAdvertiment from "../components/MainAdvertiment";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getProductsByCategory } from "../../services/productService";
import { MenClothes } from "../../types/MenClothes";

interface LinkItem {
    id: number;
    title: string;
    category: string;
}
const LinkItems: LinkItem[] = [
    { id: 1, title: "All", category: "men_jeans" },
    { id: 2, title: "Men", category: "men" },
    { id: 3, title: "Women", category: "women" },
    { id: 4, title: "T_Shirt", category: "t_shirt" },
    { id: 5, title: "Sweater", category: "sweater" },
    { id: 6, title: "Jacket", category: "jacket" },
    { id: 7, title: "Top", category: "top" },
    { id: 8, title: "Pants", category: "pants" },
    { id: 9, title: "Activewear", category: "activewear" },
];

const HomePage = () => {
    const [active, setActive] = useState<number>(1);
    const [productsByCategory, setProductsByCategory] = useState<MenClothes>();

    const handleGetProducts = (id: number, category: string) => {
        setActive(id);
        void (async () => {
            const data = await getProductsByCategory(category);
            setProductsByCategory(data?.data);
        })();
    };

    console.log(productsByCategory);

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
                        onClick={() =>
                            handleGetProducts(item.id, item.category)
                        }
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
