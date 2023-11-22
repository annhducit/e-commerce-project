import { useEffect, useState } from "react";
import { FaExclamationTriangle, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

import { ColumnsType } from "antd/es/table";
import { DatePicker, Space, Spin, Tag } from "antd";

import Button from "../../components/Button";
import TableAdmin from "../components/Table";
import ModalAdvance from "../../components/portal/ModalAdvance";

import useDebounce from "../../hooks/useDebounce";

import customerService from "../../services/customerService";

import { DataTypeAccount } from "../../types/DataTypeProduct";
import UserType, { EAccountStatus } from "../../types/UserType";

const AccountManagement = () => {
    const [accounts, setAccounts] = useState<UserType[]>();
    const [idUSer, setIdUSer] = useState<number>(0);
    const [value, setValue] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openModalUpdateAccountStatus, setOpenModalUpdateAccountStatus] =
        useState<boolean>();

    const debounce = useDebounce(value, 500);

    useEffect(() => {
        void (async () => {
            const data = await customerService.getAllUsers();
            setAccounts(data.data);
        })();
    }, []);

    useEffect(() => {
        void (async () => {
            setIsLoading(true);
            const data = await customerService.searchAccountByKeyword(debounce);
            setAccounts(data);
            setIsLoading(false);
        })();
    }, [debounce]);
    const handleUpdateAccountStatus = (id: number, status: EAccountStatus) => {
        setOpenModalUpdateAccountStatus(false);
        void (async () => {
            try {
                await customerService.updateAccountStatus(id, status);
                const data = await customerService.getAllUsers();
                setAccounts(data.data);
                toast.success("Thực hiện hành công");
            } catch (err) {
                toast.error("Thực hiện thất bại");
            }
        })();
    };

    const columns: ColumnsType<DataTypeAccount> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
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
            dataIndex: "status",
            key: "status",
            render: (_key, item) => (
                <Space size="middle">
                    {item.status === "PENDING" && (
                        <Tag color="blue" className="py-1 font-semibold">
                            {item?.status}
                        </Tag>
                    )}
                    {item.status === "NORMAL" && (
                        <Tag color="green" className="py-1 font-semibold">
                            {item?.status}
                        </Tag>
                    )}
                    {item.status === "LOCKED" && (
                        <Tag color="red" className="py-1 font-semibold">
                            {item?.status}
                        </Tag>
                    )}
                </Space>
            ),
        },

        {
            title: "Trạng thái tài khoản",
            key: "action",
            render: (_key, item) => (
                <Space className="gap-x-1">
                    <Tag
                        color="green-inverse"
                        className="py-1 font-semibold hover:cursor-pointer hover:border hover:bg-green-600"
                    >
                        Chi tiết
                    </Tag>
                    {item.status === "PENDING" && (
                        <Tag
                            color="blue"
                            className="py-1 font-semibold hover:cursor-pointer hover:bg-blue-200"
                            onClick={() =>
                                handleUpdateAccountStatus(item.id, "NORMAL")
                            }
                        >
                            Phê duyệt
                        </Tag>
                    )}
                    {item.status !== "LOCKED" && (
                        <Tag
                            color="error"
                            className="py-1 font-semibold hover:cursor-pointer hover:bg-red-200"
                            onClick={() => {
                                setIdUSer(item.id),
                                    setOpenModalUpdateAccountStatus(true);
                            }}
                        >
                            Khóa tài khoản
                        </Tag>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="flex flex-col gap-y-2">
                <h2 className="mb-6 text-2xl font-semibold opacity-60">
                    Quản lí khách hàng
                </h2>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-x-6">
                        <div className="flex items-center gap-x-2">
                            <span className="text-sm font-semibold opacity-60">
                                Từ ngày:
                            </span>
                            <DatePicker placeholder="18/11/2023" />
                        </div>
                        <div className="flex items-center gap-x-2">
                            <span className="text-sm font-semibold opacity-60">
                                Đến ngày:
                            </span>
                            <DatePicker placeholder="20/11/2023" />
                        </div>
                    </div>
                    <div className="flex items-center w-[350px] border border-[#ff7506] rounded">
                        <input
                            type="text"
                            name="search"
                            placeholder="Tên, số điện thoại ..."
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
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
                <Spin spinning={isLoading}>
                    <TableAdmin columns={columns} data={accounts} />
                </Spin>
            </div>
            <ModalAdvance
                header="Khóa tài khoản"
                size="sm"
                props={{
                    visible: openModalUpdateAccountStatus as boolean,
                    onClose: () => setOpenModalUpdateAccountStatus(false),
                    children: undefined,
                    contentClassName: "bg-white",
                }}
                footer={
                    <Space className="gap-x-2">
                        <Tag
                            color="red-inverse"
                            onClick={() =>
                                handleUpdateAccountStatus(idUSer, "LOCKED")
                            }
                            className="px-2 py-1 hover:cursor-pointer hover:bg-red-600"
                        >
                            Khóa tài khoản
                        </Tag>
                        <Tag
                            color="red"
                            onClick={() =>
                                setOpenModalUpdateAccountStatus(false)
                            }
                            className="px-2 py-1 hover:cursor-pointer hover:bg-red-200"
                        >
                            Huỷ bỏ
                        </Tag>
                    </Space>
                }
            >
                <div className="flex flex-col gap-y-4">
                    <h2>Bạn có chắc muốn khóa tài khoản này</h2>
                    <div className="mx-auto">
                        <FaExclamationTriangle className="text-6xl text-red-500" />
                    </div>
                </div>
            </ModalAdvance>
        </>
    );
};

export default AccountManagement;
