import AuthenticateLayout from "../../layouts/AuthenticateLayout";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import * as Yub from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaKey } from "react-icons/fa";

import { AnyAction } from "@reduxjs/toolkit";

import { login } from "../../services/authService";

import { useAppDispatch, useAppSelector } from "../../hooks/dispatchHook";
import Input from "../../components/Input";
import Button from "../../components/Button";
import LoginType from "../../types/LoginType";

const Signin = () => {
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

    const { auth } = useAppSelector((store) => store);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, auth.jwt, navigate]);

    const dispatch = useAppDispatch();

    const onSubmitLogin = async (data: LoginType) => {
        if (!isValid) return;
        dispatch(login(data) as unknown as AnyAction);
    };
    return (
        <AuthenticateLayout
            welcome="Welcome back Admin!"
            introduction="Enter the information to manage your application"
            padding="px-10 flex flex-col gap-2 my-auto"
            type="Admin"
            header={
                <div className="px-10 py-6">
                    <Button
                        className="float-right px-6 py-2 text-white transition-all rounded-lg bg-[#ff7506]  hover:bg-[#ff6606]"
                        text="Register"
                        onClick={() => navigate("/signup")}
                    />
                </div>
            }
        >
            <form onSubmit={handleSubmit(onSubmitLogin)}>
                <div className="flex flex-col gap-6 pt-8">
                    <Input
                        label="Email"
                        roleType="Admin"
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
                        roleType="Admin"
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
                            <span className="font-semibold">Remember me!</span>
                        </div>
                        <p className="font-semibold text-[#ff6606]">
                            Forgot password?
                        </p>
                    </div>
                    <Button
                        className="w-full py-3 font-semibold text-white transition-all bg-[#ff7506] rounded hover:bg-[#ff6606]"
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
                            className="font-semibold text-[#ff7506] cursor-pointer hover:text-[#ff6606]"
                        >
                            Sign up now{" "}
                        </Link>
                    </div>
                </div>
            </form>
        </AuthenticateLayout>
    );
};

export default Signin;
