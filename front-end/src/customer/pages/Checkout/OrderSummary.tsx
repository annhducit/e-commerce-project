import AddressItem from "../../components/AddressItem";
import Cart from "../Cart";

const OrderSummary = () => {
    return (
        <div className="p-5 shadow-lg rounded-md border border-slate-300">
            <AddressItem />
            <Cart payment={true} />
        </div>
    );
};

export default OrderSummary;
