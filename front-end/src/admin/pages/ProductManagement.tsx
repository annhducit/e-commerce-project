import React from "react";
import TableAdmin from "../components/Table";
import { ColumnsType } from "antd/es/table";
import { DataTypeProduct } from "../../types/DataTypeProduct";
import { Space, Tag } from "antd";

const ProductManagement = () => {
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

    return (
        <div>
            <TableAdmin data={data} columns={columns} />
        </div>
    );
};

export default ProductManagement;
