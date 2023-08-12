import { MenClothes } from "./MenClothes";

export type CartItemType = {
    id: number;
    product: MenClothes;
    imageUrl: string;
    ratings: unknown[]; // You can replace 'any' with a more specific type if you have the rating structure defined
    reviews: unknown[]; // You can replace 'any' with a more specific type if you have the review structure defined
    numRatings: number;
    category: {
        id: number;
        name: string;
        parentCategory: {
            id: number;
            name: string;
            parentCategory: {
                id: number;
                name: string;
                parentCategory: null;
                level: number;
            } | null;
            level: number;
        } | null;
        level: number;
    };
    dateCreate: string;

    size: null | string;
    quantity: number;
    price: number;
    discountedPrice: number;
    userId: number;
};
