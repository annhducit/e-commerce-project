import { Tag } from "antd";
import { FaStar, FaTruck } from "react-icons/fa";
import { OrderItem } from "../../types/OrderType";
import { useNavigate } from "react-router-dom";

let Type: "Order Card" | "Order Detail Card" | "Admin";

const OrderCard = ({ type, data }: { type: typeof Type; data: OrderItem }) => {
    const navigate = useNavigate();
    return (
        <div className="w-full">
            {type === "Order Card" && (
                <div className="flex justify-between p-4 transition-all rounded-md shadow hover:shadow-xl hover:bg-slate-100">
                    <div className="flex gap-x-3">
                        <div className="w-32 h-32 rounded">
                            <img
                                src={data.product.imageUrl}
                                className="w-full h-full rounded"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <h1 className="text-lg font-bold text-black">
                                {data.product.title}
                            </h1>
                            <span className="font-sm opacity-60">
                                Size: {data.size}
                            </span>
                            <span className="font-sm opacity-60">
                                Color: {data.product.color}
                            </span>
                            <p className="truncate w-[500px] ">
                                {data.product.description}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <h1 className="ml-auto text-lg font-bold">
                            {data.product.discountedPrice}$
                        </h1>
                        <div className="flex flex-col gap-y-2">
                            <div className="flex items-center gap-x-2">
                                <span>
                                    <FaTruck className="text-indigo-500" />
                                </span>
                                <h2>Expected Delivery On Mar 03</h2>
                            </div>
                            <span className="text-right">
                                Your item has been delivered!
                            </span>
                            <div className="flex items-center ml-auto gap-x-2">
                                <Tag
                                    color="green"
                                    className="px-2 py-1 cursor-pointer"
                                    onClick={() =>
                                        navigate(
                                            `../product/${data.product.id}`
                                        )
                                    }
                                >
                                    View product
                                </Tag>
                                <Tag
                                    color="blue"
                                    className="px-2 py-1 cursor-pointer"
                                    onClick={() =>
                                        navigate(
                                            `../product/${data.product.id}`
                                        )
                                    }
                                >
                                    Buy again
                                </Tag>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {type === "Order Detail Card" && (
                <div className="flex items-center justify-between p-4 transition-all rounded-md shadow hover:shadow-xl hover:bg-slate-100">
                    <div className="flex items-center gap-x-6">
                        <div className="w-24 h-24 border rounded border-slate-300">
                            <img
                                src="https://www.jotform.com/uploads/ugurg/form_files/hoodie.png"
                                className="w-full h-full rounded"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-bold text-black text-md">
                                Hoddie Design For Man
                            </h1>
                            <div className="flex gap-x-2">
                                <span className="font-thin font-sm opacity-85">
                                    Size: M
                                </span>
                                <span className="font-thin font-sm opacity-85">
                                    Color: White
                                </span>
                            </div>
                            <span className="font-thin font-sm opacity-85">
                                Seller: BeautyShop
                            </span>
                            <h1 className="font-bold text-">$160.00</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <span>
                            <FaStar className="text-yellow-500" />
                        </span>
                        <h2 className="text-lg font-semibold text-indigo-500">
                            Rate and Reviews Product
                        </h2>
                    </div>
                </div>
            )}
            {type === "Admin" && (
                <div className="flex justify-between p-4 bg-slate-50">
                    <div className="flex gap-x-3">
                        <div className="w-24 h-24 rounded">
                            <img
                                src={data.product.imageUrl}
                                className="w-full h-full rounded"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <h1 className="text-lg font-bold text-black">
                                {data.product.title}
                            </h1>
                            <span className="font-sm opacity-60">
                                Size: {data.size}, Quantity: {data.quantity}
                            </span>
                            <span className="font-sm opacity-60">
                                Color: {data.product.color}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <h1 className="ml-auto text-lg font-bold">
                            {data.product.discountedPrice}$
                        </h1>
                        <div className="flex flex-col gap-y-2">
                            <div className="flex items-center gap-x-2">
                                <span>
                                    <FaTruck className="text-indigo-500" />
                                </span>
                                <h2>Expected Delivery On Mar 03</h2>
                            </div>

                            <div className="flex items-center ml-auto gap-x-2">
                                <Tag
                                    color="green"
                                    className="px-2 py-1 cursor-pointer"
                                    onClick={() =>
                                        navigate(
                                            `../../product/${data.product.id}`
                                        )
                                    }
                                >
                                    View product
                                </Tag>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderCard;
