import Button from "../../components/Button";
import { FaSearch } from "react-icons/fa";
import TableAdmin from "../components/Table";
import { DataTypeAccount } from "../../types/DataTypeProduct";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import UserType from "../../types/UserType";
import { useEffect, useState } from "react";
import customerService from "../../services/customerService";

const AccountManagement = () => {
    const [accounts, setAccounts] = useState<UserType[]>();

    useEffect(() => {
        void (async () => {
            const data = await customerService.getAllUsers();
            setAccounts(data.data);
        })();
    }, []);

    return (
        <div className="flex flex-col gap-y-2">
            <h2 className="mb-6 text-2xl font-semibold opacity-60">
                Quản lí khách hàng
            </h2>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-x-6">
                    <div className="flex items-center gap-x-2">
                        <span>Từ ngày:</span>
                        <input
                            type="date"
                            className=" pl-4 border border-[#ff7506] px-2 py-1 h-[34px] rounded outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-x-2">
                        <span>Đến ngày:</span>
                        <input
                            type="date"
                            className=" pl-4 border border-[#ff7506] px-2 py-1 h-[34px] rounded outline-none"
                        />
                    </div>
                </div>
                <div className="flex items-center w-[350px] border border-[#ff7506] rounded">
                    <input
                        type="text"
                        name="search"
                        placeholder="Áo khoác..."
                        id=""
                        className="flex-1 pl-4 w-full px-2 py-1 h-[34px] rounded-tl rounded-bl outline-none"
                    />
                    <Button
                        text="Tìm kiếm"
                        className="text-white flex h-[34px] items-center gap-x-2 px-1 pr-1 py-1 hover:bg-[#c77028] bg-[#ff7506] rounded-tr rounded-br"
                        iconRight={<FaSearch />}
                    />
                </div>
            </div>
            <TableAdmin columns={columns} data={accounts} />
        </div>
    );
};

export default AccountManagement;

const columns: ColumnsType<DataTypeAccount> = [
    {
        title: "Họ khách hàng",
        dataIndex: "lastName",
        key: "lastName",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Tên khách hàng",
        dataIndex: "firstName",
        key: "firstName",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Số điện thoại",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        render: (text) => <a>{text || "Chưa cập nhật"}</a>,
    },
    {
        title: "Quốc gia",
        dataIndex: "nation",
        key: "nation",
        render: (text) => <a>{text || "Chưa cập nhật"}</a>,
    },
    {
        title: "Trạng thái hoạt động",
        render: () => (
            <Space size="middle">
                <Tag color="green" className="py-1 font-semibold">
                    Bình thường
                </Tag>
            </Space>
        ),
    },

    {
        title: "Trạng thái tài khoản",
        key: "action",
        render: () => (
            <Space size="middle">
                <Tag
                    color="green-inverse"
                    className="py-1 font-semibold hover:cursor-pointer hover:border hover:bg-green-600"
                >
                    Chi tiết
                </Tag>
                <Tag
                    color="error"
                    className="py-1 font-semibold hover:cursor-pointer hover:bg-red-200"
                >
                    Khóa tài khoản
                </Tag>
            </Space>
        ),
    },
];
