import ErrorType from "../types/ErrorType";

class BaseService {
    protected async checkResponseOk(res: Response) {
        if (!res.ok) {
            const errJson = (await res.json()) as ErrorType;
            throw errJson;
        }
    }

    protected async getResponse<T>(res: Response) {
        const json = (await res.json()) as T;
        return json;
    }
}

export default BaseService;
