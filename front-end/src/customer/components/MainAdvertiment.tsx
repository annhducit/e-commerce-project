import { FaCheckCircle, FaGlobeAsia } from "react-icons/fa";

const MainAdvertiment = () => {
    return (
        <div className="px-4 py-6 mb-4">
            <div className="grid grid-cols-3 gap-x-6">
                <div className="col-span-2">
                    <div className="rouded-xl w-full bg-[#bbc19f] h-72 rounded-xl">
                        <div className="flex items-center p-10">
                            <h1 className="text-5xl font-bold leading-tight w-[70%]">
                                LOOK GOOD, FEEL GREATE, PERFORM BETTER
                            </h1>
                            <div className="flex flex-col gap-y-8">
                                <div className="flex flex-col gap-y-4">
                                    <div className="flex items-center gap-x-3">
                                        <FaCheckCircle className="text-xl" />
                                        <p className="font-bold">
                                            RUNWAY GIVES THE BEST
                                        </p>
                                    </div>
                                    <p className="pl-8">
                                        DON'T WORRY ABOUT THE QUALITY OF THE
                                        CLOTHES WE SELL :))
                                    </p>
                                </div>
                                <div className="flex flex-col gap-y-4">
                                    <div className="flex items-center gap-x-3">
                                        <FaGlobeAsia className="text-xl" />
                                        <p className="font-bold">
                                            WORLD CLASS QUALITY
                                        </p>
                                    </div>
                                    <p className="pl-8">
                                        WE DO STRICT QC BEFORE THE PRODUCT GOES
                                        ON THE MARKET
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="relative object-bottom w-full h-72 rouded-xl bg-banner-advertiment rounded-xl">
                        <h1 className="absolute left-0 right-0 text-4xl text-center font-bold text-white bottom-[10%]">
                            #OUTFIT OF THE DAY FOR YOU!
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainAdvertiment;
