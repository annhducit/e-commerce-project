interface UserType {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    role: string | null;
    phoneNumber: string | null;
    address: AddressType[];
    paymentInformation: unknown[];
    createAt: string | null;
}

interface AddressType {
    id: number;
    firstName: string | null;
    lastName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
}

export interface ReviewType {
    id: number;
    review: string;
    user: UserType;
    createAt: string;
}

interface SizeType {
    name: string;
    quantity: number;
}

interface CategoryType {
    id: number;
    name: string;
    parentCategory: CategoryType | null;
    level: number;
}

export default interface ProductType {
    id: number;
    title: string;
    description: string;
    price: number;
    discountedPrice: number;
    discountPersent: number;
    quantity: number;
    brand: string;
    color: string;
    size: SizeType[];
    imageUrl: string;
    ratings: unknown[]; // You can replace "any" with a specific type if needed
    reviews: ReviewType[];
    numRatings: number;
    category: CategoryType;
    dateCreate: string;
}
