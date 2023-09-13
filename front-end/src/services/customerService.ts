import { api } from "../configs/config";
import UserType from "../types/UserType";
import BaseService from "./baseService";

class CustomerService extends BaseService {
    async updateCustomerProfile(id: string, req: FormData) {
        const res = await api.put(`/api/users/${id}/profile`, req);
        await this.checkResponseOk(res.data);
        return this.getResponse<UserType>(res.data);
    }
}

export default new CustomerService();
