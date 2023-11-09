import ItemSkeleton from "./SkeletonItem";

const LoadingSkeletonProduct = () => {
    return (
        <div className="flex flex-col gap-y-4">
            <div className="grid grid-cols-5 gap-x-6">
                <ItemSkeleton />
                <ItemSkeleton />
                <ItemSkeleton />
                <ItemSkeleton />
                <ItemSkeleton />
            </div>
        </div>
    );
};

export default LoadingSkeletonProduct;
