import MainCarousel from "../components/MainCarousel";
import MainSectionCard from "../components/ProductSectionCard/MainSectionCard";
import { menClothes } from "../../data/dataMenClothes";
import { menJean } from "../../data/dataMenJean";
import { menShirt } from "../../data/dataMenShirt";

const HomePage = () => {
    return (
        <div>
            <MainCarousel />
            <MainSectionCard heading="Men Clothes" data={menClothes} />
            <MainSectionCard type={true} heading="Men Jeans" data={menJean} />
            <MainSectionCard type={true} heading="Men Shirts" data={menShirt} />
        </div>
    );
};

export default HomePage;
