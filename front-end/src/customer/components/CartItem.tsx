import { FaMinus, FaPlus } from "react-icons/fa";
import Button from "../../components/Button";

const CartItem = () => {
    return (
        <div className="w-full p-5 mb-4 border rounded-lg shadow-md bg-bg-white border-slate-200">
            <div className="flex items-start gap-5">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-20 h-20 rounded-md lg:w-36 lg:h-36">
                        <img
                            className="object-cover object-top w-full h-full rounded-md"
                            src="https://rukminim1.flixcart.com/image/612/612/l5h2xe80/kurta/x/6/n/xl-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg?q=70"
                            alt=""
                        />
                    </div>
                    <div className="flex items-center gap-x-2">
                        <span className="p-2 text-indigo-500 transition-all cursor-pointer hover:bg-slate-300 rounded-xl">
                            <FaMinus className="text-md" />
                        </span>
                        <span className="px-6 py-1 border">1</span>
                        <span className="p-2 text-indigo-500 transition-all cursor-pointer hover:bg-slate-300 rounded-xl">
                            <FaPlus className="text-md" />
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-3 pt-2">
                    <div className="flex flex-col gap-y-1">
                        <h2 className="text-lg font-bold">
                            Casual Puff Sleeves Solid Women White Top
                        </h2>
                        <span>Size L, White</span>
                        <span>Seller: Best seller of the year</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <span className="text-lg font-semibold line-through text-slate-400">
                            $211
                        </span>
                        <span className="text-lg font-semibold">$199</span>
                        <span className="font-semibold text-indigo-600 text-md ">
                            10% Off
                        </span>
                    </div>
                    <Button
                        text="Remove"
                        className="w-24 py-2 ml-5 text-white transition-all bg-indigo-500 rounded-lg hover:bg-indigo-600"
                    />
                </div>
            </div>
        </div>
    );
};

export default CartItem;
