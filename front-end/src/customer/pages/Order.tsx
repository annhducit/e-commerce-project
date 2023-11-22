import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Tag, message } from "antd";

import OrderCard from "../components/OrderCard";

import {
    getOrderByStatus,
    getOrderHistoryByAuth,
} from "../../services/orderService";

import OrderType, { OrderStatus } from "../../types/OrderType";

const filterItem = [
    {
        label: "Placed",
        value: "PLACED",
    },
    {
        label: "Confirmed",
        value: "CONFIRMED",
    },
    {
        label: "Shipped",
        value: "SHIPPED",
    },
    {
        label: "Delivered",
        value: "DELIVERED",
    },
    {
        label: "Completed",
        value: "COMPLETED",
    },
    {
        label: "Canceled",
        value: "CANCELED",
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

    const handleFilterByStatus = (status: OrderStatus) => {
        void (async () => {
            const data = await getOrderByStatus(status);
            setOrderHistories(data);
        })();
        message.info(`List order ${status}`);
    };
    return (
        <div className="grid grid-cols-4 px-20 py-10 gap-x-10">
            <div className="col-span-1 w-full border h-[350px] border-slate-200 rounded p-4 shadow-lg">
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
                            <input
                                type="radio"
                                name="status"
                                onChange={() =>
                                    handleFilterByStatus(
                                        item.value as OrderStatus
                                    )
                                }
                            />
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
                                <div className="flex flex-col text-center gap-y-2">
                                    <p className="font-semibold text-black">
                                        Trạng thái
                                    </p>
                                    {item.orderStatus === "PENDING" && (
                                        <Tag
                                            color="blue"
                                            className="py-1 font-semibold text-center hover:cursor-pointer hover:bg-blue-200"
                                        >
                                            Pending
                                        </Tag>
                                    )}
                                    {item.orderStatus === "PLACED" && (
                                        <Tag
                                            color="green"
                                            className="py-1 font-semibold text-center hover:cursor-pointer hover:bg-blue-200"
                                        >
                                            Placed
                                        </Tag>
                                    )}
                                    {item.orderStatus === "SHIPPED" && (
                                        <Tag
                                            color="geekblue"
                                            className="py-1 font-semibold text-center hover:cursor-pointer hover:bg-blue-200"
                                        >
                                            Shipped
                                        </Tag>
                                    )}
                                    {item.orderStatus === "DELIVERED" && (
                                        <Tag
                                            color="magenta"
                                            className="py-1 font-semibold text-center hover:cursor-pointer hover:bg-blue-200"
                                        >
                                            Delivered
                                        </Tag>
                                    )}
                                    {item.orderStatus === "CONFIRMED" && (
                                        <Tag
                                            color="pink"
                                            className="py-1 font-semibold text-center hover:cursor-pointer hover:bg-blue-200"
                                        >
                                            Confirmed
                                        </Tag>
                                    )}
                                    {item.orderStatus === "COMPLETED" && (
                                        <Tag
                                            color="gold"
                                            className="py-1 font-semibold text-center hover:cursor-pointer hover:bg-blue-200"
                                        >
                                            Completed
                                        </Tag>
                                    )}
                                    {item.orderStatus === "CANCELED" && (
                                        <Tag
                                            color="error"
                                            className="py-1 font-semibold text-center hover:cursor-pointer hover:bg-blue-200"
                                        >
                                            Canceled
                                        </Tag>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <Tag
                                    color="blue"
                                    className="px-2 py-1 cursor-pointer"
                                    onClick={() => {
                                        navigate(`${item.id}`);
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                        });
                                    }}
                                >
                                    View order
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
                {orderHistories?.length === 0 && (
                    <div className="grid mx-auto">Không có đơn hàng nào</div>
                )}
            </div>
        </div>
    );
};

export default Order;
