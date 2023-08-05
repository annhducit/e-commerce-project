import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import * as Yub from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaKey } from "react-icons/fa";

import AuthenticateLayout from "../../layouts/AuthenticateLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { login } from "../../services/authService";
import LoginType from "../../types/LoginType";

const Login = () => {
    const schema = Yub.object({
        email: Yub.string()
            .email("Email is invalid")
            .required("Please enter your email"),
        password: Yub.string().required("Please enter your password"),
    }).required();

    const {
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm<LoginType>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const { auth } = useSelector((store) => store);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, auth.token]);

    const dispatch = useDispatch();
    const onSubmitLogin = async (data: LoginType) => {
        if (!isValid) return;
        dispatch(login(data));
    };
    return (
        <div>
            <AuthenticateLayout
                welcome="Welcome back!"
                introduction="Enter the information you entered while registering"
                padding="px-[200px] flex flex-col gap-2 my-auto"
                header={
                    <div className="px-10 py-6">
                        <Button
                            className="float-right px-6 py-2 text-white bg-purple-500 rounded-lg"
                            text="Register"
                        />
                    </div>
                }
            >
                <form onSubmit={handleSubmit(onSubmitLogin)}>
                    <div className="flex flex-col gap-6 pt-8">
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="text"
                            color="emerald"
                            id="email"
                            name="email"
                            lefticon={<FaEnvelope />}
                            control={control}
                            error={errors.email?.message}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            color="emerald"
                            id="password"
                            name="password"
                            lefticon={<FaKey />}
                            control={control}
                            error={errors.password?.message}
                        />
                        <div className="flex justify-between">
                            <div className="flex items-center gap-x-2">
                                <input type="checkbox" name="remember" id="" />
                                <span className="font-semibold">
                                    Remember me!
                                </span>
                            </div>
                            <p className="font-semibold text-indigo-500">
                                Forgot password?
                            </p>
                        </div>
                        <Button
                            className="w-full py-3 font-semibold text-white bg-purple-500 rounded"
                            color="emerald"
                            type="submit"
                            text="Login"
                        >
                            Login
                        </Button>
                        <div className="mt-4 text-center">
                            <span className="text-black">
                                Don't have an account yet?{" "}
                            </span>{" "}
                            <Link
                                to="/signup"
                                className="font-semibold text-purple-500 cursor-pointer hover:text-purple-700"
                            >
                                Sign up now{" "}
                            </Link>
                        </div>
                    </div>
                </form>
            </AuthenticateLayout>
        </div>
    );
};

export default Login;
