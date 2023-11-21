import ProductType from "./ProductType";

interface Address {
    id: number;
    fistName: null;
    lastName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
}

interface User {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    status: string;
    phoneNumber: string;
    nation: string;
    address: Address[];
    paymentInformation: unknown[]; // Replace with appropriate type if available
    createAt: null;
    erole: null;
}

export interface OrderItem {
    id: number;
    product: ProductType;
    size: string;
    quantity: number;
    price: number;
    discountPrice: number;
    userId: number;
    deliveryDate: null;
}

export interface ShippingAddress {
    id: number;
    fistName: null;
    lastName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
}

interface PaymentDetails {
    paymentMethod: null;
    paymentStatus: string;
    paymentId: null;
    razorpayPaymentLinkId: null;
    razorpayPaymentLinkReferenceId: null;
    razorpayPaymentLinkStatus: null;
    razorpayPaymentId: null;
}

export default interface OrderType {
    id: number;
    orderId: null;
    user: User;
    orderItems: OrderItem[];
    orderDate: number[];
    deliveryDate: null;
    shippingAddress: ShippingAddress;
    paymentDetails: PaymentDetails;
    totalPrice: number;
    totalDiscountPrice: number;
    discount: number;
    orderStatus: OrderStatus;
    createdAt: number[];
    totalItems: number;
}

export type OrderStatus =
    | "PENDING"
    | "PLACED"
    | "CONFIRMED"
    | "COMPLETED"
    | "CANCELED"
    | "DELIVERED"
    | "SHIPPED";
