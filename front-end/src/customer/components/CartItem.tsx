import { FaMinus, FaPlus } from "react-icons/fa";
import Button from "../../components/Button";
import { CartItemType } from "../../types/CartItemType";
import { removeItemToCart, updateItemToCart } from "../../services/cartService";
import { useDispatch } from "react-redux";

const CartItem = ({ data }: { data: CartItemType }) => {
    const dispatch = useDispatch();
    const handleUpdateCartItem = (value: number) => {
        const dataValue = {
            quantity: data.quantity + value,
        };
        const cartItemId = data.id;
        dispatch(updateItemToCart(dataValue, cartItemId));
    };

    const handleRemoveCartItem = () => {
        dispatch(removeItemToCart(data.id));
    };

    return (
        <div className="w-full p-3 mb-4 mr-4 bg-white border rounded-lg shadow-md border-slate-200">
            <div className="flex items-start gap-5">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-32 h-32 rounded lg:w-32 lg:h-3w-32">
                        <img
                            className="object-cover object-top w-full h-full rounded-md"
                            src={data.product?.imageUrl}
                            alt=""
                        />
                    </div>
                    <div className="flex items-center gap-x-2">
                        <span
                            onClick={() => handleUpdateCartItem(-1)}
                            className={`p-2 text-[#5798fa] transition-all cursor-pointer hover:bg-slate-300 rounded-xl ${
                                data.quantity <= 1
                                    ? "opacity-10 cursor-not-allowed"
                                    : ""
                            }`}
                        >
                            <FaMinus className="text-md" />
                        </span>
                        <span className="px-6 py-1 border">
                            {data.quantity}
                        </span>
                        <span
                            onClick={() => handleUpdateCartItem(1)}
                            className="p-2 text-[#5798fa] transition-all cursor-pointer hover:bg-slate-300 rounded-xl"
                        >
                            <FaPlus className="text-md" />
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                    <div className="flex flex-col gap-y-1">
                        <h2 className="text-lg font-bold">
                            {data.product.brand}
                        </h2>
                        <span>
                            Size {data.size}, {data.product.color}
                        </span>
                        <span>Seller: Best seller of the year</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <span className="text-lg font-semibold line-through text-slate-400">
                            {data.product.price}$
                        </span>
                        <span className="text-lg font-semibold">
                            {data.product.discountedPrice}$
                        </span>
                        <span className="font-semibold text-[#5798fa] text-md ">
                            {data.product.discountPersent}% Off
                        </span>
                    </div>
                    <Button
                        text="Remove"
                        onClick={handleRemoveCartItem}
                        className="w-24 py-1 ml-5 text-white transition-all bg-[#5798fa] rounded hover:bg-[#4c87df]"
                    />
                </div>
            </div>
        </div>
    );
};

export default CartItem;
