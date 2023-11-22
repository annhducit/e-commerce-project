import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AddressItem from "../components/AddressItem";
import OrderTrakers from "../components/OrderTrakers";
import OrderCard from "../components/OrderCard";

import { getorderByIdAdmin } from "../../services/orderService";

import OrderType from "../../types/OrderType";

const OrderDetails = () => {
    const [order, setOrder] = useState<OrderType>();

    const { id } = useParams();

    useEffect(() => {
        id &&
            void (async () => {
                const data = await getorderByIdAdmin(id);
                setOrder(data);
            })();
    }, [id]);

    return (
        <div className="px-20 py-10">
            <div className="flex flex-col gap-y-10">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-lg font-bold">Delivery address</h1>
                    {order && <AddressItem data={order?.shippingAddress} />}
                </div>
                <OrderTrakers activeStep={3} />
                <div className="h-[500px] overflow-y-scroll flex flex-col gap-y-4">
                    {order?.orderItems.map((item, index) => (
                        <OrderCard type="Order Card" key={index} data={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
