import {
    FaFacebook,
    FaGoogle,
    FaInstagram,
    FaPaperPlane,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "./Button";

const Footer = () => {
    return (
        <div className="footer px-20 py-20 bg-[#181818]">
            <div className="grid grid-rows-1">
                <div className="grid grid-cols-3">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <img
                                className="w-[160px] h-[76px] object-cover rounded"
                                src="/src/assets/images/logo.png"
                                alt=""
                            />
                            <div className="flex flex-col gap-2 pt-3 text-white">
                                <Link to="/"> Contact Us</Link>
                                <Link to="/">FAQ</Link>
                                <Link to="/">Downloads</Link>
                                <Link to="/">Locate A Dealer</Link>
                                <Link to="/">Spare Parts</Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-lg font-bold text-white">
                                Usefull Links
                            </h1>
                            <span className="text-white">Privacy Policy</span>
                            <span className="text-white">
                                Term and conditional
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-lg font-bold text-white">
                                Social Media
                            </h1>
                            <div className="flex text-xl text-white gap-x-3">
                                <span>
                                    <FaInstagram />
                                </span>
                                <span>
                                    <FaFacebook />
                                </span>
                                <span>
                                    <FaGoogle />
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-lg font-bold text-white">
                                Copyright
                            </h1>
                            <span className="text-white">
                                Distribute by Anh Duc @2023
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-6">
                        <h2 className="text-lg font-bold text-white">
                            Subscribe to our newsletter and <br />
                            Get 10% off
                        </h2>
                        <div className="relative">
                            <input
                                name="email"
                                type="text"
                                placeholder="Enter your content"
                                className="relative w-full px-6 py-3 text-white bg-transparent border rounded-full outline-none border-slate-200"
                            />
                            <FaPaperPlane className="absolute text-white top-4 right-6 " />
                        </div>
                        <Button
                            text="Subscribe"
                            className="w-full px-6 py-3 font-semibold text-black transition-all bg-white rounded hover:bg-slate-100"
                        ></Button>
                    </div>
                </div>
            </div>
            <div className="mx-auto w-[70%]">
                <span className="inline-block text-sm font-semibold text-center text-white mt-14">
                    "Welcome to my website, your ultimate online shopping
                    destination for all things stylish, trendy, and top-notch.
                    Discover an extensive collection of premium quality
                    products, carefully curated to cater to your diverse needs
                    and preferences. Whether you're searching for the latest
                    fashion trends, cutting-edge electronics, or home
                    essentials, we've got you covered".
                </span>
            </div>
        </div>
    );
};

export default Footer;
