import { Link, useNavigate } from "react-router-dom";

import ProductType from "../../types/ProductType";

const ProductSearchItem = ({
    data,
    onClick,
}: {
    data: ProductType;
    onClick: () => void;
}) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/product/${data.id}`)}
            className="w-full p-4 transition-all border-b rounded hover:bg-slate-100 border-slate-200"
        >
            <Link to={""} onClick={onClick}>
                <div className="flex items-center gap-x-4">
                    <img
                        className="object-cover rounded w-14 h-14"
                        src={data.imageUrl}
                    />
                    <div className="flex flex-col">
                        <p>{data.title}</p>
                        <div className="flex items-center gap-x-4">
                            <span className="font-semibold text-slate-600">
                                {data.discountedPrice}$
                            </span>
                            <span className="line-through opacity-60">
                                {data.price}$
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductSearchItem;
