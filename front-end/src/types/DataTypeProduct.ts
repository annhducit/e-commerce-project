import { EAccountStatus } from "./UserType";

export interface DataTypeProduct {
    id: number;
    key: string;
    title: string;
    price: number;
    discountedPrice: number;
    category: Category;
    size: Size[];
    color: string;
    brand: string;
    quantity: number;
    tags: string[];
}
export interface DataTypeAccount {
    id: number;
    key: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    nation: string;
    status: EAccountStatus;
    createAt: string;
}
export interface DataTypeOrder {
    key: string;
    name: string;
    price: number;
    category: string;
    tags: string[];
}

interface Category {
    id: number;
    name: string;
    parentCategory: ParentCategory | null;
    level: number;
}

interface ParentCategory {
    id: number;
    name: string;
    parentCategory: ParentCategory | null;
    level: number;
}

interface Size {
    name: string;
    quantity: number;
}
