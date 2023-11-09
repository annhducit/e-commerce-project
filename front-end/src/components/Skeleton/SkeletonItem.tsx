import { Fragment } from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const ItemSkeleton = () => {
    return (
        <Fragment>
            <div className="flex flex-col h-full p-3 rounded-lg card-movie bg-slate-200">
                <div className="h-[250px] mb-2">
                    <LoadingSkeleton
                        width="100%"
                        height="100%"
                        borderRadius="16px"
                    />
                </div>

                <div className="w-full py-3 font-bold text-white rounded-lg">
                    <LoadingSkeleton
                        width="100%"
                        height="48px"
                        borderRadius="4px"
                    />
                </div>
                <h3 className="text-xl font-semibold text-black">
                    <LoadingSkeleton
                        width="40%"
                        height="30px"
                        borderRadius="4px"
                    />
                </h3>
            </div>
        </Fragment>
    );
};

export default ItemSkeleton;
