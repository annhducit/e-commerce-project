import AuthenticateLayout from "../../layouts/AuthenticateLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div>
            <AuthenticateLayout
                welcome="Chào mừng bạn quay trở lại"
                introduction="Đăng nhập để tiếp tục sử dụng dịch vụ của chúng tôi"
                padding="py-10 pl-20 pr-[300px]"
                header={
                    <div className="px-10 py-6">
                        <Button
                            className="float-right px-6 py-2 text-white bg-purple-500 rounded-lg"
                            text="Đăng kí"
                        />
                    </div>
                }
            >
                <form>
                    <div className="flex flex-col gap-1 pt-8">
                        <Input
                            label="Nhập email"
                            placeholder="Nhập email của bạn"
                            type="text"
                            color="emerald"
                            id="email"
                            name="email"
                        />
                        <Input
                            label="Nhập mật khẩu"
                            placeholder="Nhập mật khẩu của bạn"
                            type="password"
                            color="emerald"
                            id="password"
                            name="password"
                        />
                        <Button
                            className="mt-4"
                            color="emerald"
                            type="submit"
                        ></Button>
                        <div className="mt-4 text-center">
                            <span className="text-black">
                                Bạn chưa có tài khoản?
                            </span>{" "}
                            <Link
                                to="/signup"
                                className="font-semibold cursor-pointer text-emerald-500 hover:text-emerald-700"
                            >
                                Đăng kí ngay
                            </Link>
                        </div>
                    </div>
                </form>
            </AuthenticateLayout>
        </div>
    );
};

export default Login;
