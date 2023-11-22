import { useEffect, useState } from "react";
import { FaCaretDown, FaSearch } from "react-icons/fa";

import { ColumnsType } from "antd/es/table";
import {
    DatePicker,
    Dropdown,
    MenuProps,
    Modal,
    Space,
    Spin,
    Tag,
    message,
} from "antd";

import OrderCard from "../../customer/components/OrderCard";
import DropdownCustom from "../../components/Dropdown";
import Button from "../../components/Button";
import TableAdmin from "../components/Table";

import OrderType, { OrderStatus } from "../../types/OrderType";
import useDebounce from "../../hooks/useDebounce";

import {
    filterOrderByDateCreate,
    getAllOrders,
    getOrderByStatus,
    getorderByIdAdmin,
    searchOrderByKeyword,
    updateOrderStatus,
} from "../../services/orderService";

const OrderManagement = () => {
    const [orders, setOrders] = useState<OrderType[]>();
    const [orderId, setOrderId] = useState<number>();
    const [order, setOrder] = useState<OrderType>();
    // Modal
    const [openModal, setOpenModal] = useState<boolean>(false);

    // Search
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");

    // Filter
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();

    const debounce = useDebounce(searchValue, 500);

    // Get all order
    useEffect(() => {
        void (async () => {
            const data = await getAllOrders();
            setOrders(data);
        })();
    }, []);

    // Order detail
    useEffect(() => {
        orderId &&
            void (async () => {
                const data = await getorderByIdAdmin(orderId);
                setOrder(data);
            })();
    }, [orderId]);

    const handleClick = (id: string, status: OrderStatus) => {
        void (async () => {
            await updateOrderStatus(id, status);
            const data = await getAllOrders();
            setOrders(data);
        })();
        message.info(`Order ${id} is ${status}`);
    };

    const columns: ColumnsType<OrderType> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Image",
            key: "imageUrl",
            render: (_key, item) => (
                <div className="flex items-center w-20 truncate">
                    {item.orderItems.map((product, index) => (
                        <div
                            key={index}
                            className="w-10 h-10 border rounded-full"
                        >
                            <img
                                src={product.product.imageUrl}
                                className="w-10 h-10 rounded-full"
                                alt=""
                            />
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
            render: (_key, item) => (
                <div className="w-64 text-sm font-semibold truncate opacity-40">
                    {item.orderItems.map((product, index) => (
                        <span key={index}>{`${product.product.title}, `}</span>
                    ))}
                </div>
            ),
        },
        {
            title: "Tổng tiền",
            key: "totalPrice",
            render: (_key, item) => <span>{item.totalPrice}$</span>,
        },
        {
            title: "Trạng thái",

            key: "orderStatus",
            render: (_key, item) => (
                <Space className="gap-x-1">
                    {item.orderStatus === "PENDING" && (
                        <Tag
                            color="blue"
                            className="py-1 font-semibold hover:cursor-pointer hover:bg-blue-200"
                        >
                            Pending
                        </Tag>
                    )}
                    {item.orderStatus === "PLACED" && (
                        <Tag
                            color="green"
                            className="py-1 font-semibold hover:cursor-pointer hover:bg-blue-200"
                        >
                            Placed
                        </Tag>
                    )}
                    {item.orderStatus === "SHIPPED" && (
                        <Tag
                            color="geekblue"
                            className="py-1 font-semibold hover:cursor-pointer hover:bg-blue-200"
                        >
                            Shipped
                        </Tag>
                    )}
                    {item.orderStatus === "DELIVERED" && (
                        <Tag
                            color="magenta"
                            className="py-1 font-semibold hover:cursor-pointer hover:bg-blue-200"
                        >
                            Delivered
                        </Tag>
                    )}
                    {item.orderStatus === "CONFIRMED" && (
                        <Tag
                            color="pink"
                            className="py-1 font-semibold hover:cursor-pointer hover:bg-blue-200"
                        >
                            Confirmed
                        </Tag>
                    )}
                    {item.orderStatus === "COMPLETED" && (
                        <Tag
                            color="gold"
                            className="py-1 font-semibold hover:cursor-pointer hover:bg-blue-200"
                        >
                            Completed
                        </Tag>
                    )}
                    {item.orderStatus === "CANCELED" && (
                        <Tag
                            color="error"
                            className="py-1 font-semibold hover:cursor-pointer hover:bg-blue-200"
                        >
                            Canceled
                        </Tag>
                    )}
                </Space>
            ),
        },

        {
            title: "Action",
            key: "action",
            render: (_key, item) => (
                <div className="flex items-center gap-x-2">
                    <Dropdown
                        menu={{
                            items,
                            onClick: (items) =>
                                handleClick(
                                    item.id.toString(),
                                    items.key as OrderStatus
                                ),
                        }}
                        className="px-2 py-1 rounded bg-slate-100"
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Trạng thái
                                <FaCaretDown />
                            </Space>
                        </a>
                    </Dropdown>
                    <Tag
                        color="green-inverse"
                        className="px-2 py-1 cursor-pointer hover:bg-green-600"
                        onClick={() => {
                            setOpenModal(true);
                            setOrderId(item.id);
                        }}
                    >
                        Chi tiết
                    </Tag>
                </div>
            ),
        },
    ];

    const handleSortOrderByStatus = (status: OrderStatus) => {
        void (async () => {
            const data = await getOrderByStatus(status);
            setOrders(data);
        })();
    };
    const filterOrder = [
        {
            id: 1,
            title: "Pending",
            onClick: () => handleSortOrderByStatus("PENDING"),
        },
        {
            id: 2,
            title: "Placed",
            onClick: () => handleSortOrderByStatus("PLACED"),
        },
        {
            id: 3,
            title: "Confirmed",
            onClick: () => handleSortOrderByStatus("CONFIRMED"),
        },
        {
            id: 4,
            title: "Shipped",
            onClick: () => handleSortOrderByStatus("SHIPPED"),
        },
        {
            id: 5,
            title: "Delivered",
            onClick: () => handleSortOrderByStatus("DELIVERED"),
        },
        {
            id: 6,
            title: "Completed",
            onClick: () => handleSortOrderByStatus("COMPLETED"),
        },
    ];

    useEffect(() => {
        void (async () => {
            setIsLoading(true);

            if (debounce) {
                const orderResults = await searchOrderByKeyword(debounce);
                setOrders(orderResults);
            } else {
                const data = await getAllOrders();
                setOrders(data);
            }

            setIsLoading(false);
        })();
    }, [debounce]);

    const handClickFilter = () => {
        void (async () => {
            const data = await filterOrderByDateCreate(startDate, endDate);
            setOrders(data);
        })();
    };
    return (
        <>
            <div className="flex flex-col gap-y-2">
                <h2 className="mb-6 text-2xl font-semibold opacity-60">
                    Quản lí đơn hàng
                </h2>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-x-6">
                        <div className="flex items-center gap-x-2">
                            <span className="text-sm font-semibold opacity-60">
                                Từ ngày:
                            </span>
                            <DatePicker
                                placeholder="18/11/2023"
                                onChange={(_item, date) => setStartDate(date)}
                                format={dateFormat}
                            />
                        </div>
                        <div className="flex items-center gap-x-2">
                            <span className="text-sm font-semibold opacity-60">
                                Đến ngày:
                            </span>
                            <DatePicker
                                placeholder="20/11/2023"
                                onChange={(_item, date) => setEndDate(date)}
                                format={dateFormat}
                            />
                        </div>
                        <div className="flex items-center gap-x-2">
                            <span className="text-sm font-semibold opacity-60">
                                Trạng thái:
                            </span>
                            <DropdownCustom data={filterOrder} />
                        </div>
                    </div>
                    <div className="flex items-center w-[350px] border border-[#ff7506] rounded">
                        <input
                            type="text"
                            name="search"
                            placeholder="Nhập từ khóa tìm kiếm"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            id=""
                            className="flex-1 pl-4 w-full px-2 py-1 h-[30px] rounded-tl rounded-bl outline-none"
                        />
                        <Button
                            text="Tìm kiếm"
                            onClick={handClickFilter}
                            className="text-white flex h-[30px] items-center gap-x-2 px-1 pr-1 py-1 hover:bg-[#c77028] bg-[#ff7506] rounded-tr rounded-br"
                            iconRight={<FaSearch />}
                        />
                    </div>
                </div>
                <Spin spinning={isLoading}>
                    {" "}
                    <TableAdmin columns={columns} data={orders} />
                </Spin>
            </div>
            <Modal
                open={openModal}
                width="750px"
                onCancel={() => setOpenModal(false)}
                footer
            >
                <div>
                    <h2 className="mb-2 text-xl font-semibold">
                        Chi tiết đơn hàng
                    </h2>
                    <hr />
                    <div className="flex items-center justify-between mt-2">
                        <h4>Order No: 1</h4>
                        <h4>Order Date: {order?.createdAt}</h4>
                    </div>
                    <div className="flex flex-col gap-y-6">
                        <div className="flex flex-col  mt-4 gap-y-4 max-h-[290px] pr-6 overflow-y-scroll">
                            {order?.orderItems.map((item, index) => (
                                <OrderCard
                                    key={index}
                                    data={item}
                                    type="Admin"
                                />
                            ))}
                        </div>
                        <div>
                            <h2 className="mb-2 text-lg font-semibold">
                                Payment & Shipping details
                            </h2>
                            <hr />
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex flex-col gap-y-2">
                                    <p>
                                        <b className="text-sm">
                                            Payment method:
                                        </b>{" "}
                                        Creadit card
                                    </p>
                                    <p>
                                        <b className="text-sm"> Delivery to:</b>{" "}
                                        {`${order?.shippingAddress.streetAddress}, ${order?.shippingAddress.city}`}
                                    </p>
                                    <p>
                                        <b className="text-sm">
                                            {" "}
                                            Delivery address:
                                        </b>{" "}
                                        {`${order?.shippingAddress.streetAddress}, ${order?.shippingAddress.city}`}
                                    </p>
                                </div>
                                <div className="w-[300px] p-4 h-[120px] rounded bg-[#fff2f0]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col gap-y-2">
                                            <h3 className="text-sm font-semibold">
                                                Sub total:{" "}
                                            </h3>
                                            <h3 className="text-sm font-semibold">
                                                Shipping fee:{" "}
                                            </h3>
                                            <h3 className="text-sm font-semibold">
                                                Total:{" "}
                                            </h3>
                                        </div>
                                        <div className="flex flex-col gap-y-2">
                                            <h3>{order?.totalPrice}$</h3>
                                            <h3>Free</h3>
                                            <h3>
                                                {order?.totalDiscountPrice}$
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default OrderManagement;

const dateFormat = "YYYY-MM-DD";

const items: MenuProps["items"] = [
    {
        label: "Placed",
        key: "placed",
    },
    {
        label: "Confirmed",
        key: "confirmed",
    },
    {
        label: "Shipped",
        key: "shipped",
    },
    {
        label: "Delivered",
        key: "delivered",
    },
    {
        label: "Completed",
        key: "completed",
    },
    {
        label: "Canceled",
        key: "canceled",
    },
];
