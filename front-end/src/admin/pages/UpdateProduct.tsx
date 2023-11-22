/* eslint-disable prefer-const */
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

import { getProductById, updateProduct } from "../../services/productService";

import CreateProductType from "../../types/CreateProductType";
import ProductType from "../../types/ProductType";

const initialSizeQuantity = [
    {
        name: "S",
        quantity: 0,
    },
    {
        name: "M",
        quantity: 0,
    },
    {
        name: "L",
        quantity: 0,
    },
];

const UpdateProduct = () => {
    const [product, setProduct] = useState<ProductType>();
    const [productData, setProductData] = useState<CreateProductType>({
        imageUrl: "",
        title: "",
        brand: "",
        color: "",
        description: "",
        discountedPrice: 0,
        discountPercent: 0,
        price: 0,
        quantity: 0,
        size: initialSizeQuantity,
        topLevelCategory: "",
        secondLevelCategory: "",
        thirdLevelCategory: "",
    });

    const navigate = useNavigate();

    const params = useParams();
    const { id } = params;

    useEffect(() => {
        id &&
            void (async () => {
                const data = await getProductById(id);
                setProduct(data?.data);
            })();
    }, [id]);

    const filterOption = (
        input: string,
        option?: { label: string; value: string }
    ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setProductData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectInputChange = (name: string, value: string) => {
        setProductData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    interface Size {
        name: string;
        quantity: number;
    }
    const handleSizeChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        let { name, value } = e.target;

        name === "size_quantity" ? (name = "quantity") : (name = e.target.name);

        const sizes: Size[] = [...productData.size];

        sizes[index][name] = value;

        setProductData((prev) => ({
            ...prev,
            size: sizes,
        }));
    };

    const handleSubmitted = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = JSON.stringify(productData);
        id &&
            void (async () => {
                await updateProduct(id, data);
                toast.success("Cập nhật sản phẩm thành công!");
                setProductData({
                    imageUrl: "",
                    title: "",
                    brand: "",
                    color: "",
                    description: "",
                    discountedPrice: 0,
                    discountPercent: 0,
                    price: 0,
                    quantity: 0,
                    size: initialSizeQuantity,
                    topLevelCategory: "",
                    secondLevelCategory: "",
                    thirdLevelCategory: "",
                });
            })();
    };
    return (
        <div className="max-h-screen mb-20">
            <h2 className="mb-6 text-2xl font-semibold text-center opacity-80">
                Cập nhật sản phẩm
            </h2>
            <form onSubmit={handleSubmitted}>
                <div className="flex flex-col px-4 gap-y-4">
                    <div className="flex items-center gap-x-6">
                        <div className="flex flex-col flex-1 gap-y-2">
                            <label className="text-sm font-bold opacity-40">
                                Nhập link ảnh sản phẩm
                            </label>
                            <Input
                                className="w-full px-4 py-2 border rounded-md outline-none focus:bg-slate-100"
                                placeholder="URL hình ảnh"
                                name="imageUrl"
                                onChange={handleChange}
                                value={productData.imageUrl}
                            ></Input>
                        </div>
                        <div className="w-32 h-32 border rounded">
                            <img
                                src={productData.imageUrl || product?.imageUrl}
                                alt=""
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6">
                        <div className="col-span-1">
                            <div className="flex flex-col gap-y-2">
                                <label className="text-sm font-bold opacity-40">
                                    Nhập tên sản phẩm
                                </label>
                                <Input
                                    className="w-full px-4 py-2 border rounded-md outline-none focus:bg-slate-100"
                                    name="title"
                                    placeholder={product?.title}
                                    onChange={handleChange}
                                    value={productData.title}
                                ></Input>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="flex flex-col gap-y-2">
                                <label className="text-sm font-bold opacity-40">
                                    Nhập nhãn hiệu
                                </label>
                                <Input
                                    className="w-full px-4 py-2 border rounded-md outline-none focus:bg-slate-100"
                                    name="brand"
                                    placeholder={product?.brand}
                                    onChange={handleChange}
                                    value={productData.brand}
                                ></Input>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6">
                        <div className="col-span-1">
                            <div className="flex flex-col gap-y-2">
                                <label className="text-sm font-bold opacity-40">
                                    Nhập màu sản phẩm
                                </label>
                                <Input
                                    className="w-full px-4 py-2 border rounded-md outline-none focus:bg-slate-100"
                                    name="color"
                                    placeholder={product?.color}
                                    onChange={handleChange}
                                    value={productData.color}
                                ></Input>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="flex flex-col gap-y-2">
                                <label className="text-sm font-bold opacity-40">
                                    Nhập số lượng sản phẩm
                                </label>
                                <Input
                                    type="number"
                                    className="w-full px-4 py-2 border rounded-md outline-none focus:bg-slate-100"
                                    name="quantity"
                                    onChange={handleChange}
                                    placeholder={product?.quantity.toString()}
                                    value={productData.quantity}
                                ></Input>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-x-6">
                        <div className="col-span-1">
                            <div className="flex flex-col gap-y-2">
                                <label className="text-sm font-bold opacity-40">
                                    Nhập giá gốc sản phẩm
                                </label>
                                <Input
                                    type="number"
                                    className="w-full px-4 py-2 border rounded-md outline-none focus:bg-slate-100"
                                    name="price"
                                    placeholder={product?.price.toString()}
                                    onChange={handleChange}
                                    value={productData.price}
                                ></Input>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="flex flex-col gap-y-2">
                                <label className="text-sm font-bold opacity-40">
                                    Nhập giá đã giảm
                                </label>
                                <Input
                                    type="number"
                                    className="w-full px-4 py-2 border rounded-md outline-none focus:bg-slate-100"
                                    onChange={handleChange}
                                    placeholder={product?.discountedPrice.toString()}
                                    name="discountedPrice"
                                    value={productData.discountedPrice}
                                ></Input>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="flex flex-col gap-y-2">
                                <label className="text-sm font-bold opacity-40">
                                    Nhập phần trăm giảm giá
                                </label>
                                <Input
                                    type="number"
                                    className="w-full px-4 py-2 border rounded-md outline-none focus:bg-slate-100"
                                    name="discountPercent"
                                    placeholder={product?.discountPercent.toString()}
                                    onChange={handleChange}
                                    value={productData.discountPercent}
                                ></Input>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-x-6">
                        <div className="col-span-1">
                            <div className="flex flex-col gap-y-2">
                                <label className="text-sm font-bold opacity-40">
                                    Chọn đối tượng sử dụng
                                </label>
                                <Select
                                    showSearch
                                    placeholder="Chọn đối tượng sử dụng"
                                    optionFilterProp="children"
                                    onChange={(value) =>
                                        handleSelectInputChange(
                                            "topLevelCategory",
                                            value
                                        )
                                    }
                                    value={productData.topLevelCategory}
                                    filterOption={filterOption}
                                    className="h-10"
                                    options={[
                                        {
                                            value: "men",
                                            label: "Nam",
                                        },
                                        {
                                            value: "women",
                                            label: "Nữ",
                                        },
                                        {
                                            value: "chidren",
                                            label: "Trẻ em",
                                        },
                                        {
                                            value: "older",
                                            label: "Người già",
                                        },
                                        {
                                            value: "others",
                                            label: "Đối tượng khác",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="flex flex-col gap-y-2">
                                <label className="text-sm font-bold opacity-40">
                                    Chọn danh mục sản phẩm
                                </label>
                                <Select
                                    showSearch
                                    placeholder="Chọn danh mục sản phẩm"
                                    optionFilterProp="children"
                                    onChange={(value) =>
                                        handleSelectInputChange(
                                            "secondLevelCategory",
                                            value
                                        )
                                    }
                                    value={productData.secondLevelCategory}
                                    filterOption={filterOption}
                                    className="h-10"
                                    options={[
                                        {
                                            value: "clothing",
                                            label: "Quần áo",
                                        },
                                        {
                                            value: "boot",
                                            label: "Giày dép",
                                        },
                                        {
                                            value: "accessories",
                                            label: "Phụ kiện",
                                        },
                                        {
                                            value: "others",
                                            label: "Khác",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="flex flex-col gap-y-2">
                                <label className="text-sm font-bold opacity-40">
                                    Chọn loại sản phẩm
                                </label>
                                <Select
                                    showSearch
                                    placeholder="Chọn thể loại sản phẩm"
                                    optionFilterProp="children"
                                    onChange={(value) =>
                                        handleSelectInputChange(
                                            "thirdLevelCategory",
                                            value
                                        )
                                    }
                                    value={productData.thirdLevelCategory}
                                    filterOption={filterOption}
                                    className="h-10"
                                    options={[
                                        {
                                            value: "t-shirts",
                                            label: "Áo phông",
                                        },
                                        {
                                            value: "shirts",
                                            label: "Áo sơ mi",
                                        },
                                        {
                                            value: "pants",
                                            label: "Quần",
                                        },
                                        {
                                            value: "jeans",
                                            label: "Quần Jean",
                                        },
                                        {
                                            value: "skinny",
                                            label: "Quần bó",
                                        },
                                        {
                                            value: "shorts",
                                            label: "Quần đùi",
                                        },
                                        {
                                            value: "women-dress",
                                            label: "Váy",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4">
                        {productData?.size.map((item, index) => (
                            <div
                                className="flex items-center w-full gap-x-6"
                                key={index}
                            >
                                <div className="flex flex-col flex-1 gap-y-2">
                                    <label className="text-sm font-bold opacity-40">
                                        Nhập size
                                    </label>
                                    <Input
                                        className="w-full px-4 py-2 border rounded-md outline-none focus:bg-slate-100"
                                        placeholder="S, M, L, XL, ..."
                                        name="name"
                                        value={item.name}
                                        onChange={(e) =>
                                            handleSizeChange(e, index as number)
                                        }
                                    ></Input>
                                </div>

                                <div className="flex flex-col flex-1 gap-y-2">
                                    <label className="text-sm font-bold opacity-40">
                                        Số lượng sản phẩm tương ứng
                                    </label>
                                    <Input
                                        type="number"
                                        className="w-full px-4 py-2 border rounded-md outline-none focus:bg-slate-100"
                                        name="size_quantity"
                                        value={item.quantity}
                                        placeholder="10, 20, 30"
                                        onChange={(e) =>
                                            handleSizeChange(e, index)
                                        }
                                    ></Input>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label className="text-sm font-bold opacity-40">
                            Nhập mô tả sản phẩm
                        </label>
                        <TextArea
                            onChange={handleChange}
                            name="description"
                            value={productData.description}
                            rows={5}
                            placeholder="Sản phẩm có kích thước vừa vặn cho hầu hết tất cả mọi người có độ tuổi từ 18 - 25 đối với nam..."
                        ></TextArea>
                    </div>
                    <div className="mb-10 ml-auto">
                        <Button
                            htmlType="submit"
                            className="hover:text-[#ff7506]"
                            onClick={() => navigate("../products")}
                        >
                            Cập nhật sản phẩm
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;
