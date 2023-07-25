import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import Input from "./Input";
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
                        <Input
                            type="text"
                            placeholder="Enter your content"
                            className="w-full px-6 py-3 text-white bg-transparent border rounded outline-none border-slate-200"
                        />
                        <Button
                            text="Subscribe"
                            className="w-full bg-white text-black px-6 py-3 rounded font-semibold hover:bg-slate-100 transition-all"
                        ></Button>
                    </div>
                </div>
            </div>
            <div className="mx-auto w-[70%]">
                <span className="inline-block mt-14 text-sm font-semibold text-center text-white">
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