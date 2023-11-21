import { useDispatch, useSelector } from "react-redux";
import AddressItem from "../../components/AddressItem";
import Cart from "../Cart";
import { useEffect } from "react";
import { getOrderById } from "../../../services/orderService";
import { useLocation } from "react-router-dom";
import { RootState } from "../../../redux/globalStore";
import { AnyAction } from "@reduxjs/toolkit";

const OrderSummary = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get("order_id");

    const { order } = useSelector((store: RootState) => store);
    const orderDetails = order?.order;

    console.log(order?.order);
    useEffect(() => {
        orderId && dispatch(getOrderById(orderId) as unknown as AnyAction);
    }, [dispatch, orderId]);
    return (
        <div className="p-5 border rounded-md shadow-lg border-slate-300">
            <AddressItem data={orderDetails?.shippingAddress} />
            <Cart payment={true} />
        </div>
    );
};

export default OrderSummary;
