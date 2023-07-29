import { FaStar, FaTruck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

let Type: "Order Card" | "Order Detail Card";

const OrderCard = ({ type }: { type: typeof Type }) => {
    const navigate = useNavigate();
    return (
        <div className="w-full p-5 border border-slate-300 rounded-md shadow-lg mb-3 hover:shadow-2xl hover:bg-slate-100 cursor-pointer transition-all">
            {type === "Order Card" && (
                <div
                    onClick={() => navigate(`/order/5`)}
                    className="flex justify-between"
                >
                    <div className="flex gap-x-3">
                        <div className="w-24 h-24 rounded border border-slate-300">
                            <img
                                src="https://www.jotform.com/uploads/ugurg/form_files/hoodie.png"
                                className="w-full h-full rounded"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <h1 className="text-md font-bold text-black">
                                Hoddie Design For Man
                            </h1>
                            <span className="font-sm font-thin opacity-85">
                                Size: M
                            </span>
                            <span className="font-sm font-thin opacity-85">
                                Color: White
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-lg font-bold ml-auto">$160.00</h1>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <span>
                                    <FaTruck className="text-indigo-500" />
                                </span>
                                <h2>Expected Delivery On Mar 03</h2>
                            </div>
                            <span>Your item has been delivered!</span>
                        </div>
                    </div>
                </div>
            )}
            {type === "Order Detail Card" && (
                <div className="flex justify-between items-center">
                    <div className="flex gap-x-6 items-center">
                        <div className="w-24 h-24 rounded border border-slate-300">
                            <img
                                src="https://www.jotform.com/uploads/ugurg/form_files/hoodie.png"
                                className="w-full h-full rounded"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-md font-bold text-black">
                                Hoddie Design For Man
                            </h1>
                            <div className="flex gap-x-2">
                                <span className="font-sm font-thin opacity-85">
                                    Size: M
                                </span>
                                <span className="font-sm font-thin opacity-85">
                                    Color: White
                                </span>
                            </div>
                            <span className="font-sm font-thin opacity-85">
                                Seller: BeautyShop
                            </span>
                            <h1 className="text-     font-bold">$160.00</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <span>
                            <FaStar className="text-yellow-500" />
                        </span>
                        <h2 className="font-semibold text-lg text-indigo-500">
                            Rate and Reviews Product
                        </h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderCard;
