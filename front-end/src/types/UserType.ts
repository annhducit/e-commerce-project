export default interface UserType {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    role: string | null;
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
