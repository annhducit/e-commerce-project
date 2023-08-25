import { api } from "../configs/config";
import ReviewType from "../types/ReviewType";

export const createReview = async (data: ReviewType) => {
    try {
        await api.post("/api/reviews", data);
        console.log("Create review successfully");
    } catch (err) {
        console.log(err);
    }
};
