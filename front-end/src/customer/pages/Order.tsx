import Button from "../../components/Button";
import OrderCard from "../components/OrderCard";

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
            <div className="col-span-3 w-full flex flex-col gap-y-4 border p-4 border-slate-200 rounded overflow-y-scroll">
                <div className="flex items-center justify-between px-6 border-b-2 pb-2  ">
                    <div className="flex items-center gap-x-6">
                        <div className="flex flex-col gap-y-2 text-center">
                            <p className="font-semibold text-black">Order ID</p>
                            <p className="font-normal opacity-70">HA142</p>
                        </div>
                        <div className="flex flex-col gap-y-2 text-center">
                            <p className="font-semibold text-black">
                                Day created
                            </p>
                            <p className="font-normal opacity-70">21/2/2023</p>
                        </div>
                        <div className="flex flex-col gap-y-2 text-center">
                            <p className="font-semibold text-black">
                                Total amount
                            </p>
                            <p className="font-normal opacity-70">160$</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-6">
                        <Button
                            text="View order"
                            className="px-2 py-1 bg-[#64a1ff] rounded text-white cursor-pointer hover:bg-[#497bc7] transition-all"
                        />
                        <Button
                            text="View involce"
                            className="px-2 py-1 bg-[#64a1ff] rounded text-white cursor-pointer hover:bg-[#497bc7] transition-all"
                        />
                    </div>
                </div>

                <OrderCard type="Order Card" />
                <OrderCard type="Order Card" />
                <OrderCard type="Order Card" />
            </div>
        </div>
    );
};

export default Order;
