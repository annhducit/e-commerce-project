import { Link, useNavigate } from "react-router-dom";
import ProductType from "../../types/ProductType";

const ProductSearchItem = ({ data }: { data: ProductType }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/product/${data.id}`)}
            className="w-full p-4 transition-all border-b rounded hover:bg-slate-100 border-slate-200"
        >
            <Link to={""}>
                <div className="flex items-center gap-x-4">
                    <img
                        className="object-cover w-10 h-10 rounded"
                        src={data.imageUrl}
                    />
                    <div className="flex flex-col">
                        <p>{data.title}</p>
                        <div className="flex items-center gap-x-4">
                            <span>{data.discountedPrice}</span>
                            <span className="line-through opacity-70">
                                {data.price}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductSearchItem;
