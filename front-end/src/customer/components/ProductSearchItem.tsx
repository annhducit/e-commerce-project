import { Link } from "react-router-dom";
import ProductType from "../../types/ProductType";

const ProductSearchItem = ({ data }: { data: ProductType }) => {
    return (
        <div className="w-full p-4 hover:bg-slate-100 transition-all border-b rounded border-slate-200">
            <Link to={""}>
                <div className="flex items-center gap-x-4">
                    <img
                        className="w-10 h-10 rounded object-cover"
                        src="https://product.hstatic.net/1000333546/product/z4470486773480_31505acbd2277702dc277f923708a213_1bebae3e1098445095658bc229d71842_grande.jpg"
                    />
                    <div className="flex flex-col">
                        <p>Áo sơ mi ngắn tay cho nam</p>
                        <div className="flex items-center gap-x-4">
                            <span>250.000đ</span>
                            <span className="opacity-70 line-through">
                                400.000đ
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductSearchItem;
