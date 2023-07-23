import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { dataMainCarousel } from "../../data/dataMainCarousel";

const items = dataMainCarousel.map((item) => (
    <div className="w-full h-[700px]">
        {" "}
        <img
            className="object-cover"
            role="presentation"
            src={item.image}
            alt={item.path}
        ></img>
    </div>
));

const MainCarousel = () => (
    <AliceCarousel
        disableButtonsControls
        autoPlay
        mouseTracking
        autoPlayInterval={2000}
        animationDuration={1000}
        infinite
        items={items}
    />
);

export default MainCarousel;
