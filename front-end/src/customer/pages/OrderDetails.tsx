import AddressItem from "../components/AddressItem";
import OrderTrakers from "../components/OrderTrakers";
import OrderCard from "../components/OrderCard";

const OrderDetails = () => {
    return (
        <div className="px-20 py-10">
            <div className="flex flex-col gap-y-10">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-lg font-bold">Delivery address</h1>
                    <AddressItem />
                </div>
                <OrderTrakers activeStep={3} />
                <div className="h-[100vh] overflow-y-scroll">
                    {[1, 1, 1, 1, 1, 1].map((item) => (
                        <OrderCard type="Order Detail Card" key={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
