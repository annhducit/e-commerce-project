import Input from "../../components/Input";
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
            <div className="col-span-1 w-full border h-[300px] border-slate-300 rounded p-4 shadow-lg">
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
                            <Input type="checkbox" defaultValue={item.value} />
                            <label className="opacity-80" htmlFor={item.value}>
                                {item.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-span-3 w-full border h-[100vh] border-slate-300 rounded p-4 overflow-y-scroll">
                {[1, 1, 1, 1, 1, 1].map((item) => (
                    <OrderCard type="Order Card" key={item} />
                ))}
            </div>
        </div>
    );
};

export default Order;
