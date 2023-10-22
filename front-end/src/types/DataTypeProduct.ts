export interface DataTypeProduct {
    key: string;
    title: string;
    price: number;
    category: Category;
    size: Size[];
    color: string;
    brand: string;
    quantity: number;
    tags: string[];
}
export interface DataTypeAccount {
    key: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    nation: string;
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
