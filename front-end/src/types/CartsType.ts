import { CartItemType } from "./CartItemType";

export type CartsType = {
    id: number;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        password: string;
        email: string;
        role: string | null; // Change 'string' to the actual type for roles if available
        phoneNumber: string | null;
        address: unknown[]; // You can replace 'any' with a more specific type if you have an address structure defined
        paymentInformation: unknown[]; // You can replace 'any' with a more specific type if you have payment information structure defined
        createAt: string | null;
    };
    cartItems: CartItemType[];
    totalPrice: number;
    totalItem: number;
    totalDiscountPrice: number;
    discount: number;
};
