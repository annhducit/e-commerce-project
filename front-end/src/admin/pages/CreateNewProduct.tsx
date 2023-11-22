/* eslint-disable prefer-const */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, Input, Select, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";

import CreateProductType from "../../types/CreateProductType";

import { createProduct } from "../../services/productService";

import defaultImg from "../../assets/images/no-image.png";

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
const CreateNewProduct = () => {
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

    const handleSizeChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        let { name, value } = e.target;

        name === "size_quantity" ? (name = "quantity") : (name = e.target.name);

        const sizes = [...productData.size];
        sizes[index][name] = value;
        setProductData((prev) => ({
            ...prev,
            size: sizes,
        }));
    };

    const handleSubmitted = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = JSON.stringify(productData);
        void (async () => {
            await createProduct(data);
            toast.success("Bạn đã tạo sản phẩm thành công!");
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
                Tạo mới sản phẩm
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
                                src={productData.imageUrl || defaultImg}
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
                                    placeholder="White T-Shirt Size M"
                                    name="title"
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
                                    placeholder="Nike, Adidas,..."
                                    name="brand"
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
                                    placeholder="Trắng, Nâu, ..."
                                    name="color"
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
                                    placeholder="100, ..."
                                    name="quantity"
                                    onChange={handleChange}
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
                                    placeholder="550000, ..."
                                    name="price"
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
                                    placeholder="300000, ..."
                                    onChange={handleChange}
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
                                    placeholder="300000, ..."
                                    name="discountPercent"
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
                        {productData.size.map((item, index) => (
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
                                            handleSizeChange(e, index)
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
                                        placeholder="10, 20, 30, ..."
                                        name="size_quantity"
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
                    <div className="flex items-center mb-10 ml-auto gap-x-2">
                        <Tag
                            color="error"
                            className="px-4 py-1 cursor-pointer hover:bg-red-100"
                            onClick={() => navigate("../products")}
                        >
                            Trở về
                        </Tag>
                        <Button htmlType="submit">Tạo sản phẩm</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateNewProduct;
