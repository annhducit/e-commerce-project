import TableAdmin from "../components/Table";
import { ColumnsType } from "antd/es/table";
import { DataTypeProduct } from "../../types/DataTypeProduct";
import { Space, Spin, Tag } from "antd";
import Dropdown from "../../components/Dropdown";
import { DropdownItemType } from "../../types/DropdownItemType";
import Button from "../../components/Button";
import {
    FaEnvelope,
    FaExclamationTriangle,
    FaGlobeAsia,
    FaPhone,
    FaSearch,
    FaUser,
} from "react-icons/fa";
import ModalAdvance from "../../components/portal/ModalAdvance";
import { useEffect, useState } from "react";
import InputNormal from "../../components/InputNormal";
import {
    deleteProductById,
    getAllProducts,
    getProductById,
    searchProductByKeyword,
    sortByDiscountedPrice,
} from "../../services/productService";
import ProductType from "../../types/ProductType";
import useDebounce from "../../hooks/useDebounce";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductManagement = () => {
    const [openModalNewProduct, setOpenModalNewProduct] = useState<boolean>();
    const [openModalProductDetails, setOpenModalProductDetails] =
        useState<boolean>();

    const [products, setProducts] = useState<ProductType[]>();
    const [product, setProduct] = useState<ProductType>();

    // Search
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");

    // Delete product
    const [modalDeleteProduct, setOpenModalDeleteProduct] = useState<boolean>();
    const [idProduct, setIdProduct] = useState<number>();

    const debounce = useDebounce(searchValue, 500);

    const navigate = useNavigate();

    useEffect(() => {
        void (async () => {
            const data = await getAllProducts();
            setProducts(data?.data);
        })();
    }, []);

    useEffect(() => {
        void (async () => {
            setIsLoading(true);

            if (debounce) {
                const productResult = await searchProductByKeyword(debounce);
                setProducts(productResult);
            } else {
                const data = await getAllProducts();
                setProducts(data?.data);
            }

            setIsLoading(false);
        })();
    }, [debounce]);

    const handleSortProductByDiscountedPrice = (sortBy: string) => {
        void (async () => {
            setIsLoading(true);
            const productResult = await sortByDiscountedPrice(sortBy);
            setProducts(productResult);
            setIsLoading(false);
        })();
    };

    const handleClickProductDetail = (id: number) => {
        setOpenModalProductDetails(true);
        void (async () => {
            const data = await getProductById(id);
            setProduct(data?.data);
        })();
    };

    const handleDeleteProduct = (id: number) => {
        void (async () => {
            await deleteProductById(id);
            toast.success(`Deleted Product Successfully`);
            const data = await getAllProducts();
            setProducts(data?.data);
        })();
    };

    const columns: ColumnsType<DataTypeProduct> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "title",
            key: "title",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Giá gốc",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Giá đã giảm",
            dataIndex: "discountedPrice",
            key: "discountedPrice",
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
            render: (_key, item) => (
                <Space size="small">
                    <Tag
                        color="green-inverse"
                        className="py-1 font-semibold hover:cursor-pointer hover:bg-green-600"
                        onClick={() => handleClickProductDetail(item.id)}
                    >
                        Chi tiết
                    </Tag>
                    <Tag
                        color="green"
                        className="py-1 font-semibold hover:cursor-pointer hover:bg-green-200"
                        onClick={() =>
                            navigate(`/admin/update-product/${item.id}`)
                        }
                    >
                        Sửa sản phẩm
                    </Tag>
                    <Tag
                        color="volcano"
                        className="py-1 font-semibold hover:cursor-pointer hover:bg-red-200"
                        onClick={() => {
                            setOpenModalDeleteProduct(true),
                                setIdProduct(item.id);
                        }}
                    >
                        Xóa sản phẩm
                    </Tag>
                </Space>
            ),
        },
    ];

    // Sort by discounted price
    const filterProduct: DropdownItemType[] = [
        {
            id: 1,
            title: "Giá tăng dần",
            onClick: () => handleSortProductByDiscountedPrice("price_low"),
        },
        {
            id: 2,
            title: "Giá giảm dần",
            onClick: () => handleSortProductByDiscountedPrice("price_high"),
        },
        {
            id: 3,
            title: "Mới nhất",
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
                                    value={searchValue}
                                    onChange={(e) =>
                                        setSearchValue(e.target.value)
                                    }
                                    id=""
                                    className="flex-1 pl-4 w-full px-2 py-1 h-[30px] rounded-tl rounded-bl outline-none"
                                />
                                <Button
                                    text="Tìm kiếm"
                                    className="text-white flex h-[30px] items-center gap-x-2 px-1 pr-1 py-1 hover:bg-[#c77028] bg-[#ff7506] rounded-tr rounded-br"
                                    iconRight={<FaSearch />}
                                />
                            </div>
                        </div>
                    </div>
                    <Button
                        text="Tạo sản phẩm mới"
                        className="bg-[#ff7506] rounded text-white px-3 py-1"
                        onClick={() => navigate("/admin/add-new")}
                    />
                </div>
                <Spin spinning={isLoading}>
                    <TableAdmin data={products} columns={columns} />
                </Spin>
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
                        role="Admin"
                        name="fullname"
                        leftIcon={<FaEnvelope />}
                        type="text"
                        placeholder="Enter your content"
                        className="flex-1 py-3 bg-transparent outline-none"
                    />
                    <InputNormal
                        label="Họ và tên"
                        role="Admin"
                        name="fullname"
                        leftIcon={<FaUser />}
                        type="text"
                        placeholder="Enter your content"
                        className="flex-1 py-3 bg-transparent outline-none"
                    />
                    <InputNormal
                        label="Số điện thoại"
                        role="Admin"
                        name="fullname"
                        leftIcon={<FaPhone />}
                        type="text"
                        placeholder="Enter your content"
                        className="flex-1 py-3 bg-transparent outline-none"
                    />
                    <InputNormal
                        label="Quốc gia"
                        role="Admin"
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
                size="lg"
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
                <div className="grid grid-cols-2 gap-x-6">
                    <div className="flex flex-col col-span-1 gap-y-4">
                        <div className="w-full rounded shadow-md h-96">
                            <img
                                src={product?.imageUrl}
                                alt=""
                                className="w-full h-full rounded"
                            />
                        </div>
                        <div>
                            <h2>
                                <b>Mã sản phẩm</b>: {product?.id}
                            </h2>
                            <h2>
                                <b>Ngày tạo</b>: {product?.dateCreate}
                            </h2>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div>
                            <h2 className="text-lg font-semibold">
                                {product?.title}
                            </h2>
                            <span className="text-lg font-semibold opacity-60">
                                {product?.brand}
                            </span>
                        </div>
                        <hr className="my-4" />
                        <div className="flex flex-col gap-y-2">
                            <p>
                                <b>Category</b>: {product?.category.name}
                            </p>
                            <div className="flex items-center gap-x-1">
                                <b>Price: </b>
                                <p>{product?.discountedPrice}$</p>
                                <p className="line-through opacity-80">
                                    {product?.price}$
                                </p>
                            </div>
                            <p>
                                <b>Discount percent</b>:{" "}
                                {product?.discountPercent}%
                            </p>
                            <p>
                                <b>Color: </b>
                                {product?.color}
                            </p>

                            <div className="flex items-center gap-x-4">
                                <b> Size:</b>{" "}
                                {product?.size.map((item) => (
                                    <li className="list-none">{item?.name}</li>
                                ))}
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <b>Description</b>
                                <p>{product?.description}</p>
                            </div>
                            <div className="flex items-center mt-4 ml-auto gap-x-2">
                                <Tag
                                    color="green"
                                    className="px-4 py-2 font-semibold hover:cursor-pointer hover:bg-green-200"
                                    onClick={() =>
                                        navigate(
                                            `/admin/update-product/${product?.id}`
                                        )
                                    }
                                >
                                    Sửa sản phẩm
                                </Tag>
                                <Tag
                                    color="volcano"
                                    className="px-4 py-2 font-semibold hover:cursor-pointer hover:bg-red-200"
                                    onClick={() => {
                                        setOpenModalDeleteProduct(true);
                                        setIdProduct(product?.id);
                                    }}
                                >
                                    Xóa sản phẩm
                                </Tag>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalAdvance>

            {/* Delete product modal */}
            <ModalAdvance
                header="Xóa sản phẩm"
                size="sm"
                props={{
                    visible: modalDeleteProduct as boolean,
                    onClose: () => setOpenModalDeleteProduct(false),
                    children: undefined,
                    contentClassName: "bg-white",
                }}
                footer={
                    <Space className="gap-x-2">
                        <Tag
                            color="red-inverse"
                            onClick={() => {
                                idProduct && handleDeleteProduct(idProduct);
                                setOpenModalDeleteProduct(false);
                            }}
                            className="px-2 py-1 hover:cursor-pointer hover:bg-red-600"
                        >
                            Xóa sản phẩm
                        </Tag>
                        <Tag
                            color="red"
                            onClick={() => setOpenModalDeleteProduct(false)}
                            className="px-2 py-1 hover:cursor-pointer hover:bg-red-200"
                        >
                            Huỷ bỏ
                        </Tag>
                    </Space>
                }
            >
                <div className="flex flex-col gap-y-4">
                    <h2>Bạn có chắc muốn xóa sản phẩm này!</h2>
                    <div className="mx-auto">
                        <FaExclamationTriangle className="text-6xl text-red-500" />
                    </div>
                </div>
            </ModalAdvance>
        </>
    );
};

export default ProductManagement;
