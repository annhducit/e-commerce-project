import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import { getOrderHistoryByAuth } from "../../services/orderService";
import { Tag } from "antd";
import OrderType from "../../types/OrderType";
import { useNavigate } from "react-router-dom";

const filterItem = [
    {
        value: "on_the_way",
        label: "On The Way",
    },
    {
        value: "delivered",
        label: "Delivered",
    },
    {
        value: "cancelled",
        label: "Cancelled",
    },
    {
        value: "returned",
        label: "Returned",
    },
];

const Order = () => {
    const [orderHistories, setOrderHistories] = useState<OrderType[]>();

    const navigate = useNavigate();

    useEffect(() => {
        void (async () => {
            const data = await getOrderHistoryByAuth();
            setOrderHistories(data);
            console.log(data);
        })();
    }, []);

    return (
        <div className="grid grid-cols-4 px-20 py-10 gap-x-10">
            <div className="col-span-1 w-full border h-[300px] border-slate-200 rounded p-4 shadow-lg">
                <div className="flex flex-col gap-y-3">
                    <h1 className="text-lg font-bold">Filters</h1>
                    <hr className="mt-1" />
                    <h1 className="text-lg font-semibold opacity-80">
                        Order Status
                    </h1>
                </div>
                <div className="flex flex-col pt-4 gap-y-3">
                    {filterItem.map((item, index) => (
                        <div className="flex items-center gap-x-3" key={index}>
                            {" "}
                            <input type="checkbox" defaultValue={item.value} />
                            <label className="opacity-80" htmlFor={item.value}>
                                {item.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col col-span-3 gap-y-6">
                {orderHistories?.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col w-full p-4 border rounded border-slate-200"
                    >
                        <div className="flex items-center justify-between px-6 pb-2 border-b-2 ">
                            <div className="flex items-center gap-x-6">
                                <div className="flex flex-col text-center gap-y-2">
                                    <p className="font-semibold text-black">
                                        Order ID
                                    </p>
                                    <p className="font-normal opacity-70">
                                        {item.id}
                                    </p>
                                </div>
                                <div className="flex flex-col text-center gap-y-2">
                                    <p className="font-semibold text-black">
                                        Day created
                                    </p>
                                    <p className="font-normal opacity-70">
                                        21/2/2023
                                    </p>
                                </div>
                                <div className="flex flex-col text-center gap-y-2">
                                    <p className="font-semibold text-black">
                                        Total amount
                                    </p>
                                    <p className="font-normal opacity-70">
                                        {item.totalPrice}$
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <Tag
                                    color="blue"
                                    className="px-2 py-1"
                                    onClick={() => navigate(`${item.id}`)}
                                >
                                    View order
                                </Tag>
                                <Tag color="green" className="px-2 py-1">
                                    View involce
                                </Tag>
                            </div>
                        </div>

                        <div className="overflow-y-scroll max-h-[600px] flex flex-col gap-y-4">
                            {item.orderItems.map((item, index) => (
                                <OrderCard
                                    key={index}
                                    data={item}
                                    type="Order Card"
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Order;
