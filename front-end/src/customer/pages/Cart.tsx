import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnyAction } from "@reduxjs/toolkit";

import Button from "../../components/Button";
import CartItem from "../components/CartItem";

import { getCart } from "../../services/cartService";

import { CartsType } from "../../types/CartsType";

import { useAppDispatch, useAppSelector } from "../../hooks/dispatchHook";

const Cart = ({ payment }: { payment?: boolean }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleCheckout = () => {
        navigate(`/checkout?step=2`);
    };
    const { cart } = useAppSelector((store) => store);

    const cartByUser: CartsType = cart?.cart;

    useEffect(() => {
        dispatch(getCart() as unknown as AnyAction);
    }, [cart.updateCartItem, cart.deleteCartItem, dispatch]);

    return (
        <div className="grid grid-cols-3 px-10 py-5 my-2 gap-x-6">
            <div className="col-span-2 overflow-y-scroll h-[800px] pr-4 overflow-hidden">
                {cartByUser?.cartItems.map((item, index) => (
                    <CartItem key={index} data={item} />
                ))}
            </div>
            <div className="grid col-span-1 sticky top-0 h-[100vh]">
                <div className="p-5 border h-[350px] shadow-md border-slate-200 rounded-lg">
                    <h2 className="font-bold text-md text-slate-500">
                        PRICE DETAILS
                    </h2>
                    <hr className="my-4 bg-slate-400" />

                    <div className="flex flex-col gap-y-3">
                        <div className="flex justify-between">
                            <span className="font-semibold text-black text-md opacity-80">
                                Price
                            </span>
                            <span className="font-semibold text-black text-md ">
                                ${cartByUser?.totalPrice}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-black text-md opacity-80">
                                Discount
                            </span>
                            <span className="font-semibold text-[#64a1ff] text-md opacity-80">
                                -${cartByUser?.discount}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-black text-md opacity-80">
                                Delivery Charges
                            </span>
                            <span className="font-semibold text-[#64a1ff] text-md opacity-80">
                                Free
                            </span>
                        </div>
                    </div>
                    <hr className="my-4 bg-slate-400" />
                    <div className="flex justify-between">
                        <h1 className="text-lg font-bold text-black">
                            Total Amount
                        </h1>
                        <h1 className="text-lg font-bold text-[#64a1ff]">
                            ${cartByUser?.totalDiscountPrice}
                        </h1>
                    </div>
                    {payment ? (
                        <Button
                            text="PAYMENT"
                            className="w-full p-4 mt-8 font-semibold text-white transition-all bg-[#64a1ff] rounded hover:bg-[#5798fa]"
                        ></Button>
                    ) : (
                        <Button
                            onClick={handleCheckout}
                            text="CHECK OUT"
                            className="w-full p-4 mt-8 font-semibold text-white transition-all bg-[#64a1ff] rounded hover:bg-[#5798fa]"
                        ></Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
