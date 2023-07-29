import { useNavigate } from "react-router-dom";
import { MenClothes } from "../../../types/MenClothes";

const ProductCard = ({ product }: { product: MenClothes }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/product/${product.id}`)}
            className="product-card w-[240px] m-3 transition-all cursor-pointer border border-slate-100 rounded-lg"
        >
            <div className="h-80 w-full rounded-tl-lg rounded-tr-lg">
                <img
                    className="w-full h-full object-top rounded-tl-lg rounded-tr-lg"
                    src={product.imageUrl}
                    alt=""
                />
            </div>
            <div className="content bg-white p-3 transition-all">
                <div className="flex flex-col gap-y-2">
                    <p className="font-bold opacity-60">{product.title}</p>
                    <p>{product.brand}</p>
                </div>
                <div className="flex items-center space-x-3">
                    <p className="font-semibold">${product.discountedPrice}</p>
                    <p className="line-through opacity-60">${product.price}</p>
                    <p className="text-blue-500 font-semibold">
                        {product.discountPersent}%
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
