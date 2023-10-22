import TableAdmin from "../components/Table";
import { ColumnsType } from "antd/es/table";
import { DataTypeProduct } from "../../types/DataTypeProduct";
import { Space, Tag } from "antd";
import Dropdown from "../../components/Dropdown";
import { DropdownItemType } from "../../types/DropdownItemType";
import Button from "../../components/Button";
import {
    FaEnvelope,
    FaGlobeAsia,
    FaPhone,
    FaSearch,
    FaUser,
} from "react-icons/fa";
import ModalAdvance from "../../components/portal/ModalAdvance";
import { useEffect, useState } from "react";
import InputNormal from "../../components/InputNormal";
import { getAllProducts } from "../../services/productService";
import ProductType from "../../types/ProductType";

const ProductManagement = () => {
    const [openModalNewProduct, setOpenModalNewProduct] = useState<boolean>();
    const [openModalProductDetails, setOpenModalProductDetails] =
        useState<boolean>();

    const [products, setProducts] = useState<ProductType[]>();

    useEffect(() => {
        void (async () => {
            const data = await getAllProducts();
            setProducts(data.data);
            console.log(data.data);
        })();
    }, []);

    const columns: ColumnsType<DataTypeProduct> = [
        {
            title: "Tên sản phẩm",
            dataIndex: "title",
            key: "title",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Thể loại",
            dataIndex: ["category", "name"],
            key: "category",
        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Màu sắc",
            dataIndex: "color",
            key: "color",
        },

        {
            title: "Action",
            key: "action",
            render: () => (
                <Space size="small">
                    <Tag
                        color="green-inverse"
                        className="py-1 font-semibold hover:cursor-pointer hover:bg-green-600"
                        onClick={() => setOpenModalProductDetails(true)}
                    >
                        Chi tiết
                    </Tag>
                    <Tag
                        color="green"
                        className="py-1 font-semibold hover:cursor-pointer hover:bg-green-200"
                    >
                        Sửa sản phẩm
                    </Tag>
                    <Tag
                        color="volcano"
                        className="py-1 font-semibold hover:cursor-pointer hover:bg-red-200"
                    >
                        Xóa sản phẩm
                    </Tag>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div>
                <h2 className="mb-6 text-2xl font-semibold opacity-60">
                    Quản lí sản phẩm
                </h2>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-x-6">
                        <div className="flex items-center my-4 gap-x-2">
                            <span>Sắp xếp: </span>
                            <Dropdown data={filterProduct} />
                        </div>
                        <div className="flex items-center gap-x-2">
                            <span>Tìm kiếm:</span>
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
                    </div>
                    <Button
                        text="Tạo sản phẩm mới"
                        className="bg-[#ff7506] rounded text-white px-3 py-1"
                        onClick={() => setOpenModalNewProduct(true)}
                    />
                </div>
                <TableAdmin data={products} columns={columns} />
            </div>
            {/* Create new product */}
            <ModalAdvance
                header="Tạo sản phẩm mới"
                props={{
                    visible: openModalNewProduct as boolean,
                    onClose: () => setOpenModalNewProduct(false),
                    children: undefined,
                    contentClassName: "bg-white",
                }}
                footer={
                    <div className="flex items-center float-right gap-x-2">
                        <Button
                            text="Hủy"
                            className="px-2 py-1 text-white bg-red-500 rounded"
                        />

                        <Button
                            text="Cập nhật"
                            className="px-2 py-1 text-white bg-[#ff7506] rounded"
                        />
                    </div>
                }
            >
                <div className="flex flex-col w-full gap-y-2">
                    <InputNormal
                        label="Email"
                        name="fullname"
                        leftIcon={<FaEnvelope />}
                        type="text"
                        placeholder="Enter your content"
                        className="flex-1 py-3 bg-transparent outline-none"
                    />
                    <InputNormal
                        label="Họ và tên"
                        name="fullname"
                        leftIcon={<FaUser />}
                        type="text"
                        placeholder="Enter your content"
                        className="flex-1 py-3 bg-transparent outline-none"
                    />
                    <InputNormal
                        label="Số điện thoại"
                        name="fullname"
                        leftIcon={<FaPhone />}
                        type="text"
                        placeholder="Enter your content"
                        className="flex-1 py-3 bg-transparent outline-none"
                    />
                    <InputNormal
                        label="Quốc gia"
                        name="fullname"
                        leftIcon={<FaGlobeAsia />}
                        type="text"
                        placeholder="Enter your content"
                        className="flex-1 py-3 bg-transparent outline-none"
                    />
                </div>
            </ModalAdvance>
            {/* Product detail */}
            <ModalAdvance
                header="Chi tiết sản phẩm"
                props={{
                    visible: openModalProductDetails as boolean,
                    onClose: () => setOpenModalProductDetails(false),
                    children: undefined,
                    contentClassName: "bg-white",
                }}
                footer={
                    <div className="flex items-center float-right gap-x-2">
                        <Button
                            text="Đóng"
                            className="px-2 py-1 text-white bg-red-500 rounded"
                        />
                    </div>
                }
            >
                <div className="flex flex-col w-full gap-y-2"></div>
            </ModalAdvance>
        </>
    );
};

export default ProductManagement;

const filterProduct: DropdownItemType[] = [
    {
        id: 1,
        title: "Giá tăng dần",
    },
    {
        id: 2,
        title: "Giá giảm dần",
    },
    {
        id: 3,
        title: "Mới nhất",
    },
];
