import React from "react";
import { MenClothes } from "../../../types/MenClothes";

const ProductItem = ({
    product,
    type,
}: {
    product: MenClothes;
    type?: boolean;
}) => {
    return (
        <React.Fragment>
            <>
                {type ? (
                    <div className="flex  flex-col w-[300px] h-[580px] hover:bg-slate-50 transition-all gap-y-2 cursor-pointer rounded-lg bg-white shadow-lg overflow-hidden mx-3">
                        <div className="w-full h-[450px] rounded-lg">
                            <img
                                className="object-top w-full h-full"
                                src={product.imageUrl}
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col px-3 mt-3 gap-y-3">
                            <h2 className="font-semibold opacity-60">
                                {product.title}
                            </h2>
                            <span className="font-bold">{product.price}</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center flex-col w-[15rem] h-[330px] hover:bg-slate-50 transition-all gap-y-2 cursor-pointer rounded-lg bg-white shadow-lg overflow-hidden mx-3">
                        <div className="w-[10rem] h-[13rem] rounded-lg">
                            <img
                                className="object-top w-full h-full"
                                src={product.imageUrl}
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col px-3 mt-3 gap-y-3">
                            <h2 className="font-semibold opacity-60">
                                {product.title}
                            </h2>
                            <span className="font-bold">{product.price}</span>
                        </div>
                    </div>
                )}
            </>
        </React.Fragment>
    );
};

export default ProductItem;
