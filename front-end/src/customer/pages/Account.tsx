import background from "../../assets/images/background1.jpg";
import user from "../../assets/images/admin.png";

import { useEffect, useState } from "react";
import { getUserProfile } from "../../services/authService";
import ModalAdvance from "../../components/portal/ModalAdvance";
import { useAppDispatch, useAppSelector } from "../../hooks/dispatchHook";
import { AnyAction } from "@reduxjs/toolkit";
import InputNormal from "../../components/InputNormal";
import { FaGlobeAsia, FaPhone, FaUser } from "react-icons/fa";
import { Tag } from "antd";
import { toast } from "react-toastify";
import TypeUpdateInformation from "../../types/AccountInformation";
import customerService from "../../services/customerService";

const Account = () => {
    const [openModal, setOpenModal] = useState<boolean>();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [nation, setNation] = useState<string>("");

    const dispatch = useAppDispatch();
    const token = localStorage.getItem("token");

    const { auth } = useAppSelector((store) => store);

    useEffect(() => {
        if (token) {
            dispatch(getUserProfile(token) as unknown as AnyAction);
        }
    }, [token, auth.jwt, dispatch]);

    const handleUpdateProfile = () => {
        const updatedUserInfo: TypeUpdateInformation = {
            firstName,
            lastName,
            nation,
            phoneNumber,
        };
        const data = JSON.stringify(updatedUserInfo);
        void (async () => {
            customerService.updateCustomerProfile(data);
            token && dispatch(getUserProfile(token) as unknown as AnyAction);
            setOpenModal(false);
            toast.success("Thực hiện thành công");
        })();
    };
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
                    <h2 className="font-semibold text-md text-[#64a1ff]">
                        Thông tin cá nhân
                    </h2>
                    <div className="flex items-center gap-x-2">
                        <p>Trạng thái cập nhật:</p>

                        <Tag color="green" className="px-2 text-sm">
                            Đã hoàn tất
                        </Tag>
                    </div>

                    <p className="lg:-mt-10 lg:hidden">
                        Mức độ xác thực:{" "}
                        <span className="px-2 text-sm text-white bg-red-500 rounded">
                            Chưa hoàn tất
                        </span>
                    </p>

                    <Tag
                        color="blue"
                        className="px-2 py-1 ml-auto transition-all cursor-pointer hover:bg-[#5d9dfd]"
                        onClick={() => setOpenModal(true)}
                    >
                        Cập nhật thông tin
                    </Tag>
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
                                        {auth.user?.phoneNumber}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="py-2">Quốc gia: </th>
                                    <td className="py-2 lg:pl-44">
                                        {auth.user?.nation}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ModalAdvance
                header="Cập nhật thông tin"
                props={{
                    visible: openModal as boolean,
                    onClose: () => setOpenModal(false),
                    children: undefined,
                    contentClassName: "bg-white",
                }}
                footer={
                    <div className="flex items-center float-right gap-x-2">
                        <Tag
                            color="red-inverse"
                            className="px-4 py-1 text-md font-semibold"
                        >
                            Hủy
                        </Tag>

                        <Tag
                            color="blue-inverse"
                            className="px-4 py-1 text-md font-semibold cursor-pointer"
                            onClick={handleUpdateProfile}
                        >
                            Cập nhật
                        </Tag>
                    </div>
                }
            >
                <div className="flex flex-col w-full gap-y-2">
                    <InputNormal
                        label="Tên"
                        leftIcon={<FaUser />}
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder={auth.user?.firstName}
                        className="flex-1 py-3 bg-transparent outline-none"
                    />
                    <InputNormal
                        label="Họ"
                        leftIcon={<FaUser />}
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder={auth.user?.lastName}
                        className="flex-1 py-3 bg-transparent outline-none"
                    />
                    <InputNormal
                        label="Số điện thoại"
                        name="fullname"
                        leftIcon={<FaPhone />}
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder={auth.user?.phoneNumber}
                        className="flex-1 py-3 bg-transparent outline-none"
                    />
                    <InputNormal
                        label="Quốc gia"
                        name="fullname"
                        leftIcon={<FaGlobeAsia />}
                        type="text"
                        value={nation}
                        onChange={(e) => setNation(e.target.value)}
                        placeholder={auth.user?.nation}
                        className="flex-1 py-3 bg-transparent outline-none"
                    />
                </div>
            </ModalAdvance>
        </div>
    );
};

export default Account;
