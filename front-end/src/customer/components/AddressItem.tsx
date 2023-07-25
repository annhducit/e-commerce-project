import Button from "../../components/Button";

const AddressItem = () => {
    return (
        <div className="flex flex-col w-full p-4 border-b gap-y-1 border-slate-200">
            <h2 className="font-bold text-md">Nguyễn Trọng Đức</h2>
            <div className="flex items-center gap-x-2">
                <h2 className="font-semibold text-md">Địa chỉ:</h2>
                <span>Phường Tân Phong, Quận 7, Tp Hồ Chí Minh</span>
            </div>
            <div className="flex items-center gap-x-2">
                <h2 className="font-semibold text-md">Zipcode:</h2>
                <span>2222</span>
            </div>
            <div className="flex items-center gap-x-2">
                <h2 className="font-semibold text-md">Điện thoại:</h2>
                <span>0945372635</span>
            </div>
            <div className="ml-auto">
                <Button
                    text="Delivery Here"
                    className="p-2 text-white transition-all bg-indigo-500 rounded hover:bg-indigo-600"
                />
            </div>
        </div>
    );
};

export default AddressItem;
