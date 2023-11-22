import { ShippingAddress } from "../../types/OrderType";

const AddressItem = ({ data }: { data: ShippingAddress }) => {
    return (
        <div className="flex flex-col w-full p-4 border-b gap-y-1 border-slate-200">
            <h2 className="font-bold text-md">
                {data?.lastName} {data?.fistName}
            </h2>
            <div className="flex items-center gap-x-2">
                <h2 className="font-semibold text-md">Địa chỉ:</h2>
                <span>
                    {data?.streetAddress}, {data?.city}
                </span>
            </div>
            <div className="flex items-center gap-x-2">
                <h2 className="font-semibold text-md">Zipcode:</h2>
                <span>{data?.zipCode}</span>
            </div>
            <div className="flex items-center gap-x-2">
                <h2 className="font-semibold text-md">Điện thoại:</h2>
                <span>{data?.phoneNumber}</span>
            </div>
        </div>
    );
};

export default AddressItem;
