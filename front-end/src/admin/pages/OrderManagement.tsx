import TableAdmin from "../components/Table";
import { ColumnsType } from "antd/es/table";
import { DataTypeProduct } from "../../types/DataTypeProduct";
import { Space, Tag } from "antd";
import Button from "../../components/Button";
import { FaSearch } from "react-icons/fa";

const OrderManagement = () => {
    return (
        <div className="flex flex-col gap-y-2">
            <h2 className="mb-6 text-2xl font-semibold opacity-60">
                Quản lí đơn hàng
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
            <TableAdmin columns={columns} data={data} />
        </div>
    );
};

export default OrderManagement;

const columns: ColumnsType<DataTypeProduct> = [
    {
        title: "Product name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
    },
    {
        title: "Category",
        dataIndex: "category",
        key: "category",
    },
    {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? "geekblue" : "green";
                    if (tag === "loser") {
                        color = "volcano";
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                <a>Delete {record.name}</a>
                <a>Update</a>
            </Space>
        ),
    },
];

const data: DataTypeProduct[] = [
    {
        key: "1",
        name: "Pant Jean for Men",
        price: 2000,
        category: "Men Jean",
        tags: ["new", "sold out"],
    },
    {
        key: "2",
        name: "Pant Jean for Men",
        price: 1500,
        category: "Men Jean",
        tags: ["new", "sold out"],
    },
    {
        key: "3",
        name: "Pant Jean for Men",
        price: 2000,
        category: "Men Jean",
        tags: ["new", "sold out"],
    },
];
