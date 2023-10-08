import { FaEnvelope, FaKey, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yub from "yup";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../components/Input";
import Button from "../../components/Button";
import AuthenticateLayout from "../../layouts/AuthenticateLayout";
import AuthType from "../../types/RegisterType";
import { register } from "../../services/authService";

const Register = () => {
    const schema = Yub.object({
        firstName: Yub.string().required("Please enter your firstname"),
        lastName: Yub.string().required("Please enter your lastname"),
        email: Yub.string()
            .email("Email is invalid")
            .required("Please enter your email"),
        password: Yub.string()
            .min(
                8,
                "Please enter your password at least 8 characters or greater than"
            )
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, {
                message:
                    "Please enter your password at least one digit, one lower case letter and one upper case letter",
            }),
    }).required();

    const {
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm<AuthType>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const { auth } = useSelector((store) => store);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            navigate("/signin");
        }
    }, [token, auth.token, navigate]);

    const dispatch = useDispatch();
    const onSubmit = async (data: AuthType) => {
        if (!isValid) return;
        dispatch(register(data));
    };
    return (
        <div>
            <AuthenticateLayout
                welcome="Welcome to my website"
                introduction="Enter the information you entered while registering"
                padding="px-10 flex flex-col gap-2 my-auto"
                header={
                    <div className="px-10 py-6">
                        <Button
                            className="float-right px-6 py-2 text-white transition-all bg-purple-500 rounded-lg hover:bg-purple-600"
                            text="Login"
                            onClick={() => navigate("/signin")}
                        />
                    </div>
                }
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6 pt-10">
                        <div className="flex gap-x-6">
                            <Input
                                label="First Name"
                                placeholder="Enter your fistname"
                                type="text"
                                color="emerald"
                                id="email"
                                name="firstName"
                                lefticon={<FaUser />}
                                control={control}
                                error={errors.firstName?.message}
                            />
                            <Input
                                label="Last Name"
                                placeholder="Enter your lastname"
                                type="text"
                                color="emerald"
                                id="email"
                                name="lastName"
                                lefticon={<FaUser />}
                                control={control}
                                error={errors.lastName?.message}
                            />
                        </div>
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
                        <Button
                            className="w-full py-3 font-semibold text-white transition-all bg-purple-500 rounded hover:bg-purple-600"
                            color="emerald"
                            type="submit"
                            text="Register"
                        >
                            Register
                        </Button>
                        <div className="mt-4 text-center">
                            <span className="text-black">
                                Don't have an account yet?{" "}
                            </span>{" "}
                            <Link
                                to="/signin"
                                className="font-semibold text-purple-500 cursor-pointer hover:text-purple-700"
                            >
                                Sign in now{" "}
                            </Link>
                        </div>
                    </div>
                </form>
            </AuthenticateLayout>
        </div>
    );
};

export default Register;
