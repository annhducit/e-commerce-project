import { api } from "../configs/config";
import UserType from "../types/UserType";
import BaseService from "./baseService";

class CustomerService extends BaseService {
    async updateCustomerProfile(id: string, req: FormData) {
        const res = await api.put(`/api/users/${id}/profile`, req);
        await this.checkResponseOk(res.data);
        return this.getResponse<UserType>(res.data);
    }

    async getAllUsers() {
        try {
            const data = await api.get("/api/users/all");
            return data.data;
        } catch (err) {
            console.log(err);
        }
    }
}

export default new CustomerService();
