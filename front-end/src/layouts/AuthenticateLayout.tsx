import loginImages from "../assets/images/clothes2.jpg";
import logo from "../assets/images/logo.png";
import hand from "../assets/images/hand.png";

interface AuthenticationNode {
    welcome: string;
    introduction?: string;
    padding?: string;
    children: React.ReactNode;
    header?: React.ReactNode;
}

export default function AuthenticateLayout({
    children,
    welcome,
    introduction,
    padding,
    header,
}: AuthenticationNode) {
    return (
        <div className="grid w-full h-screen grid-cols-7 gap-8 bg-white rounded-xl">
            <div className="col-span-3 py-4 bg-gray-100 rounded-md md:block">
                <div className="absolute top-4 left-4">
                    <img src={logo} className="w-[100px] h-14" />
                </div>
                <div className="px-4 pt-20 space-y-10">
                    <div className="h-[420px] mx-auto">
                        <img
                            src={loginImages}
                            className="w-full h-full rounded-lg"
                        />
                    </div>
                    <div className="p-4 space-y-6 rounded-lg bg-slate-700">
                        <p className="text-white">
                            Online shopping provides convenience and
                            accessibility, allowing customers to shop from the
                            comfort of their homes at any time.
                        </p>
                        <div className="flex items-center gap-3">
                            <img
                                src={logo}
                                className="w-10 h-10 rounded-full"
                            ></img>
                            <div className="flex flex-col text-white">
                                <p className="font-bold">Anh Duc</p>
                                <p>Web Developer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col col-span-4">
                <header>{header}</header>
                <div className={`${padding}`}>
                    <div className="flex items-center gap-3">
                        <p className="text-3xl font-bold text-purple-500">
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
