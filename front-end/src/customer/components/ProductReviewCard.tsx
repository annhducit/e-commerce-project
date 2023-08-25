import { Rating } from "@mui/material";
import { ReviewType } from "../../types/ProductType";

const ProductReviewCard = ({ data }: { data: ReviewType }) => {
    return (
        <div className="flex items-center gap-x-6 w-full p-6 border-b border-slate-200 rounded-lg">
            <div className="w-10 h-10 rounded-full">
                <img
                    className="w-full h-full border rounded-full"
                    src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
                    alt=""
                />
            </div>
            <div className="flex flex-col">
                <h2 className="font-semibold">
                    {data.user.firstName} {data.user.lastName}
                </h2>
                <span className="font-sm text-slate-400">{data.createAt}</span>
                <Rating name="read-only" value={5.5} readOnly />
                <p>{data.review}</p>
            </div>
        </div>
    );
};

export default ProductReviewCard;
