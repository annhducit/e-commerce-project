// import Button from "../../components/Button";
type Shipping = {
    city: string;
    firstName: string | null;
    id: number;
    lastName: string;
    phoneNumber: string;
    state: string;
    streetAddress: string;
    zipCode: string;
};

const AddressItem = ({ data }: { data: Shipping }) => {
    return (
        <div className="flex flex-col w-full p-4 border-b gap-y-1 border-slate-200">
            <h2 className="font-bold text-md">
                {data.lastName} {data.firstName}
            </h2>
            <div className="flex items-center gap-x-2">
                <h2 className="font-semibold text-md">Địa chỉ:</h2>
                <span>
                    {data.streetAddress}, {data.city}
                </span>
            </div>
            <div className="flex items-center gap-x-2">
                <h2 className="font-semibold text-md">Zipcode:</h2>
                <span>{data.zipCode}</span>
            </div>
            <div className="flex items-center gap-x-2">
                <h2 className="font-semibold text-md">Điện thoại:</h2>
                <span>{data.phoneNumber}</span>
            </div>
            {/* <div className="ml-auto">
                <Button
                    text="Delivery Here"
                    className="p-2 text-white transition-all bg-indigo-500 rounded hover:bg-indigo-600"
                />
            </div> */}
        </div>
    );
};

export default AddressItem;
