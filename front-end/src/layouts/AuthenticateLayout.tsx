import loginImages from "../assets/images/clothes2.jpg";
import logo from "../assets/images/logo.png";

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
        <div className="grid w-full h-screen grid-cols-5 gap-8 bg-white rounded-xl">
            <div className="col-span-2 py-4 bg-gray-100 rounded-md md:block">
                <div className="absolute top-4 left-4">
                    <img src={logo} className="w-[100px] h-14" />
                </div>
                <div className="px-4 space-y-10 pt-28">
                    <div className="h-[200px] mx-auto">
                        <img
                            src={loginImages}
                            className="w-full h-full rounded-lg"
                        />
                    </div>
                    <div className="p-4 space-y-6 rounded-lg bg-slate-700">
                        <p className="text-white">
                            Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ
                            hội sự nghiệp lý tưởng. Hãy để chúng tôi giúp bạn
                            làm điều đó!
                        </p>
                        <div className="flex items-center gap-3">
                            <img
                                src={logo}
                                className="w-10 h-10 rounded-full"
                            ></img>
                            <div className="flex flex-col text-white">
                                <p className="font-bold">My Team</p>
                                <p>Web Developer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-span-3">
                <header>{header}</header>
                <div className={`${padding}`}>
                    <p className="text-2xl font-bold text-emerald-500">
                        {welcome}
                    </p>
                    <p className="pt-2 font-semibold text-gray-700">
                        {introduction}
                    </p>
                    {children}
                </div>
            </div>
        </div>
    );
}
