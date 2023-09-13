import background from "../../assets/images/background1.jpg";
import user from "../../assets/images/admin.png";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/globalStore";
import { getUserProfile } from "../../services/authService";

const Account = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const { auth } = useSelector((store: RootState) => store);
    console.log(auth);

    useEffect(() => {
        if (token) {
            dispatch(getUserProfile(token));
        }
    }, [token, auth.token, dispatch]);
    return (
        <div className="">
            {" "}
            <div className="relative w-full h-96 bg-slate-50">
                <img
                    src={background}
                    className="object-cover object-bottom w-full h-full"
                    alt=""
                />
            </div>
            <div className="flex items-center justify-between px-20 gap-x-4">
                <div className="flex items-center gap-x-4">
                    <div className="relative pl-6 rounded-full -translate-y-2/4">
                        <img
                            src={user}
                            className="object-cover w-40 h-40 border-4 border-white rounded-full"
                        />
                    </div>
                    <h2 className="flex-1 -mt-10 text-lg font-semibold lg:text-lg text-slate-700">
                        {auth.user?.firstName} {auth.user?.lastName}
                    </h2>
                </div>
            </div>
            <div className="flex flex-col px-20 -translate-y-10 gap-y-4">
                <div className="flex lg:items-center lg:gap-y-0 gap-y-4 lg:flex-row  flex-col gap-x-[155px]">
                    <h2 className="font-semibold text-md text-emerald-500">
                        Thông tin cá nhân
                    </h2>
                    <div className="flex items-center gap-x-2">
                        <p>Trạng thái cập nhật:</p>

                        <span className="px-2 text-sm text-white bg-indigo-500 rounded">
                            Đã hoàn tất
                        </span>
                    </div>

                    <p className="lg:-mt-10 lg:hidden">
                        Mức độ xác thực:{" "}
                        <span className="px-2 text-sm text-white bg-red-500 rounded">
                            Chưa hoàn tất
                        </span>
                    </p>

                    <div className="px-2 py-1 text-sm text-center text-white transition-all bg-purple-500 rounded cursor-pointer lg:ml-auto hover:bg-purple-600">
                        Cập nhật thông tin
                    </div>
                </div>
                <div className="flex flex-col gap-y-2">
                    <hr className=" border-slate-200" />
                    <div className="flex flex-col lg:flex-row">
                        <table className="text-left">
                            <tbody>
                                <tr>
                                    <th className="py-2">Họ và Tên: </th>
                                    <td className="py-2 lg:pl-44">
                                        {" "}
                                        {auth.user?.firstName}{" "}
                                        {auth.user?.lastName}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="py-2">Email: </th>
                                    <td className="py-2 lg:pl-44">
                                        {" "}
                                        {auth.user?.email}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="py-2">Số điện thoại: </th>
                                    <td className="py-2 lg:pl-44">
                                        {auth.user?.phoneNumber || "Không có"}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="py-2">Quốc gia: </th>
                                    <td className="py-2 lg:pl-44">Việt Nam</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
