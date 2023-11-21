import React from "react";
import Button from "../../../components/Button";
import AddressItem from "../../components/AddressItem";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createOrder } from "../../../services/orderService";
import { toast } from "react-toastify";

const DeliveryAddressForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        const address = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            streetAddress: data.get("address"),
            city: data.get("city"),
            state: data.get("state"),
            zipCode: data.get("zipcode"),
            phoneNumber: data.get("phone"),
        };

        const orderData = { address, navigate };
        dispatch(createOrder(orderData));
        toast.success("Order successfully!");
    };
    return (
        <div className="container">
            <div className="grid grid-cols-3 gap-x-5">
                <div className="col-span-1 w-full h-[30.5rem] border rounded border-slate-300 overflow-y-scroll">
                    <AddressItem />
                    <AddressItem />
                    <AddressItem />
                    <AddressItem />
                    <AddressItem />
                </div>
                <div className="w-full col-span-2 p-6 border rounded border-slate-300">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-rows-1">
                            <div className="grid grid-cols-2 gap-6">
                                <input
                                    placeholder="First name"
                                    name="firstName"
                                    className="w-full p-3 border rounded-md outline-none focus:bg-slate-100 border-slate-300"
                                    type="text"
                                    autoComplete="none"
                                />
                                <input
                                    placeholder="Last name"
                                    name="lastName"
                                    className="w-full p-3 border rounded-md outline-none focus:bg-slate-100 border-slate-300"
                                    type="text"
                                    autoComplete="none"
                                />
                            </div>
                        </div>
                        <div className="grid grid-rows-1">
                            <textarea
                                name="address"
                                id=""
                                placeholder="Enter your address"
                                className="w-full h-32 p-3 my-6 border rounded-md outline-none focus:bg-slate-100 border-slate-300"
                            ></textarea>
                        </div>
                        <div className="grid grid-rows-1">
                            <div className="grid grid-cols-2 gap-6">
                                <input
                                    placeholder="City"
                                    className="w-full p-3 border rounded-md outline-none focus:bg-slate-100 border-slate-300"
                                    type="text"
                                    autoComplete="none"
                                    name="city"
                                />
                                <input
                                    placeholder="State/Province/Region"
                                    className="w-full p-3 border rounded-md outline-none focus:bg-slate-100 border-slate-300"
                                    type="text"
                                    autoComplete="none"
                                    name="state"
                                />
                            </div>
                        </div>
                        <div className="grid grid-rows-1 my-6">
                            <div className="grid grid-cols-2 gap-6">
                                <input
                                    placeholder="Zipcode"
                                    className="w-full p-3 border rounded-md outline-none focus:bg-slate-100 border-slate-300"
                                    type="text"
                                    autoComplete="none"
                                    name="zipcode"
                                />
                                <input
                                    placeholder="Phone number"
                                    className="w-full p-3 border rounded-md outline-none focus:bg-slate-100 border-slate-300"
                                    type="text"
                                    autoComplete="none"
                                    name="phone"
                                />
                            </div>
                        </div>
                        <div className="float-right">
                            <Button
                                type="submit"
                                text="Delivery Here"
                                className="p-4 font-semibold text-white transition-all bg-indigo-500 rounded hover:bg-indigo-600 text-md w-44"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DeliveryAddressForm;
