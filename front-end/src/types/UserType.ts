export default interface UserType {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    role: ERole;
    status: EAccountStatus;

    phoneNumber: string;
    nation: string;
    address: Address[];
    paymentInformation: unknown[];
    createAt: string | null;
}

interface Address {
    id: number;
    firstName: string | null;
    lastName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
}

type ERole = "CUSTOMER" | "ADMIN";
export type EAccountStatus = "PENDING" | "NORMAL" | "LOCKED";
