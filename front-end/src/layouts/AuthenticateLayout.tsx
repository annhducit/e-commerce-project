import loginImages from "../assets/images/clothes2.jpg";
import logo from "../assets/images/logo.png";
import hand from "../assets/images/hand.png";
import { RoleType } from "../types/RoleType";
interface AuthenticationNode {
    welcome: string;
    introduction?: string;
    padding?: string;
    children: React.ReactNode;
    header?: React.ReactNode;
    type?: RoleType;
}

export default function AuthenticateLayout({
    children,
    welcome,
    introduction,
    padding,
    header,
    type = "Customer",
}: AuthenticationNode) {
    return (
        <div className="grid w-full h-screen grid-cols-7 gap-8 bg-white rounded-xl">
            <div className="col-span-4 px-10 bg-[#EAECED] rounded-tr-3xl rounded-br-3xl md:block">
                <div className="absolute top-4 left-14">
                    <img src={logo} className="w-[120px] object-cover h-14" />
                </div>
                <div className="px-4 pt-24 space-y-10">
                    <div className="h-[420px] mx-auto border">
                        <img
                            src={loginImages}
                            className="w-full h-full rounded-lg"
                        />
                    </div>
                    <div className="p-4 space-y-6 rounded-lg bg-[#FFFCFC]">
                        <p className="text-gray-600">
                            Online shopping provides convenience and
                            accessibility, allowing customers to shop from the
                            comfort of their homes at any time.
                        </p>
                        <div className="flex items-center gap-3">
                            <img
                                src={logo}
                                className="w-10 h-10 border rounded-full"
                            ></img>
                            <div className="flex flex-col text-gray-600">
                                <p className="font-bold">Anh Duc</p>
                                <p>Web Developer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col col-span-3">
                <header>{header}</header>
                <div className={`${padding}`}>
                    <div className="flex items-center gap-3">
                        <p
                            className={`text-3xl font-bold ${
                                type === "Admin"
                                    ? "text-[#ff7506]"
                                    : "text-[#64a1ff]"
                            }`}
                        >
                            {welcome}
                        </p>
                        <img src={hand} alt="" className="w-12 h-12" />
                    </div>
                    <p className="pt-2 font-semibold text-gray-700 opacity-70">
                        {introduction}
                    </p>
                    {children}
                </div>
            </div>
        </div>
    );
}
